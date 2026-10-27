#!/usr/bin/env bash
#
# Downscale + recompress photos so the repo and the Docker image stay small.
# Sources are never touched unless --in-place is passed.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DEFAULT_INPUT_DIR="$REPO_ROOT/site/public/gallery"

MAX_DIM=2000
QUALITY=4
IN_PLACE=0
INPUT_DIR=""
OUTPUT_DIR=""

usage() {
  cat <<'EOF'
Downscale + recompress photos so the repo (and the Docker image) stay small.
Sources are never touched unless --in-place is passed. Metadata (including
GPS) is stripped, and images are never scaled up.

Usage:
  scripts/ffmeg/downscale_photos.sh
      site/public/gallery  ->  site/public/gallery_downscaled

  scripts/ffmeg/downscale_photos.sh <input_dir> <output_dir>

  scripts/ffmeg/downscale_photos.sh --in-place
      Replaces the originals in site/public/gallery, keeping them in
      site/public/gallery/_originals. Sub-folders are ignored by
      site/app/photos/page.tsx, so the backups never appear on the site.

Options:
  -w, --width N     Max long edge in pixels (default 2000)
  -q, --quality N   ffmpeg JPEG quality, 2 = best / 31 = worst (default 4)
  -i, --in-place    Overwrite the originals (kept in <input_dir>/_originals)
  -h, --help        Show this message

Requires ffmpeg (brew install ffmpeg), same as process_photo.sh.
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    -w|--width)   MAX_DIM="${2:?--width needs a value}"; shift 2 ;;
    -q|--quality) QUALITY="${2:?--quality needs a value}"; shift 2 ;;
    -i|--in-place) IN_PLACE=1; shift ;;
    -h|--help)    usage; exit 0 ;;
    -*)           echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
    *)
      if [ -z "$INPUT_DIR" ]; then
        INPUT_DIR="$1"
      elif [ -z "$OUTPUT_DIR" ]; then
        OUTPUT_DIR="$1"
      else
        echo "Too many arguments: $1" >&2; usage >&2; exit 1
      fi
      shift ;;
  esac
done

case "$MAX_DIM" in ''|*[!0-9]*) echo "--width must be a whole number" >&2; exit 1 ;; esac
case "$QUALITY" in ''|*[!0-9]*) echo "--quality must be a whole number" >&2; exit 1 ;; esac

INPUT_DIR="${INPUT_DIR:-$DEFAULT_INPUT_DIR}"
BACKUP_DIR=""

if [ "$IN_PLACE" -eq 1 ]; then
  if [ -n "$OUTPUT_DIR" ]; then
    echo "--in-place writes back into the input dir, so don't pass an output dir" >&2
    exit 1
  fi
  OUTPUT_DIR="$INPUT_DIR"
  BACKUP_DIR="$INPUT_DIR/_originals"
else
  OUTPUT_DIR="${OUTPUT_DIR:-${INPUT_DIR%/}_downscaled}"
fi

command -v ffmpeg >/dev/null 2>&1 || {
  echo "ffmpeg not found - install it with: brew install ffmpeg" >&2
  exit 1
}
[ -d "$INPUT_DIR" ] || { echo "Input directory not found: $INPUT_DIR" >&2; exit 1; }

mkdir -p "$OUTPUT_DIR"
if [ -n "$BACKUP_DIR" ]; then
  mkdir -p "$BACKUP_DIR"
fi

# Only ever shrink: cap the long edge at MAX_DIM, keeping the aspect ratio.
SCALE="scale='min($MAX_DIM,iw)':'min($MAX_DIM,ih)':force_original_aspect_ratio=decrease"

human() { awk -v b="$1" 'BEGIN { if (b >= 1048576) printf "%.1f MB", b / 1048576; else printf "%.0f KB", b / 1024 }'; }
size_of() { wc -c < "$1" | tr -d ' '; }

echo "Downscaling:   $INPUT_DIR"
echo "            -> $OUTPUT_DIR"
echo "Max long edge: ${MAX_DIM}px    JPEG quality: $QUALITY"
if [ -n "$BACKUP_DIR" ]; then
  echo "Originals:     $BACKUP_DIR"
fi
echo

processed=0
failed=0
total_before=0
total_after=0

for src in "$INPUT_DIR"/*.jpg "$INPUT_DIR"/*.JPG "$INPUT_DIR"/*.jpeg "$INPUT_DIR"/*.JPEG "$INPUT_DIR"/*.png "$INPUT_DIR"/*.PNG; do
  [ -f "$src" ] || continue
  name="$(basename "$src")"

  if [ -n "$BACKUP_DIR" ]; then
    mv "$src" "$BACKUP_DIR/$name"
    source_file="$BACKUP_DIR/$name"
  else
    source_file="$src"
  fi

  dest="$OUTPUT_DIR/$name"
  before="$(size_of "$source_file")"

  if ! ffmpeg -hide_banner -loglevel error -y -i "$source_file" -vf "$SCALE" -q:v "$QUALITY" "$dest" </dev/null; then
    echo "  FAILED   $name"
    failed=$((failed + 1))
    continue
  fi

  after="$(size_of "$dest")"
  note=""
  if [ "$after" -ge "$before" ]; then
    # Already optimised - re-encoding only loses quality, so keep the original bytes.
    cp "$source_file" "$dest"
    after="$before"
    note="  (kept original, re-encode was larger)"
  fi

  processed=$((processed + 1))
  total_before=$((total_before + before))
  total_after=$((total_after + after))
  printf '  %-42s %9s -> %9s%s\n' "$name" "$(human "$before")" "$(human "$after")" "$note"
done

echo
if [ "$processed" -eq 0 ] && [ "$failed" -eq 0 ]; then
  echo "No .jpg/.jpeg/.png images found in $INPUT_DIR"
  exit 0
fi

echo "Processed:  $processed image(s)"
if [ "$failed" -gt 0 ]; then
  echo "Failed:     $failed image(s)"
fi
echo "Before:     $(human "$total_before")"
echo "After:      $(human "$total_after")"
awk -v b="$total_before" -v a="$total_after" 'BEGIN { if (b > 0) printf "Saved:      %.1f%%\n", (1 - a / b) * 100 }'

if [ -z "$BACKUP_DIR" ]; then
  echo
  echo "Originals untouched. Re-run with --in-place to replace the gallery files."
fi

if [ "$failed" -gt 0 ]; then
  exit 1
fi
