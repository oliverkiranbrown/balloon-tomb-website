#!/bin/zsh

# === INPUT/OUTPUT DIR ===
INPUT_DIR="/Users/oliverkiranbrown/Documents/Balloon Tomb/Possible Website Assets/Marcus Camera 30th Nov 2025/portrait_vid_to_gif/rotated"
OUTPUT_DIR="/Users/oliverkiranbrown/Documents/Balloon Tomb/Possible Website Assets/Marcus Camera 30th Nov 2025/portrait_vid_to_gif/processed"

# Loop through the .mov files in the input dir
for FILE in $INPUT_DIR/*.(mov|MOV)(N); do
    
    # Filename without extension
    RAW_NAME=$(basename "$FILE")
    BASENAME="${RAW_NAME:r}"

    echo "Processing: $BASENAME.mov"

    # Output names
    OUT_MP4="$OUTPUT_DIR/${BASENAME}_pixelated.mp4"
    OUT_GIF="$OUTPUT_DIR/${BASENAME}_pixelated.gif"
    PALETTE="$OUTPUT_DIR/${BASENAME}_palette.png"

    # --- 1. Convert to grayscale + pixelated 8-bit MP4 ---
    ffmpeg -i "$FILE" \
        -vf "format=gray,scale=iw/40:ih/40:flags=neighbor,scale=iw*40:ih*40:flags=neighbor,format=y8" \
        -pix_fmt gray \
        -y "$OUT_MP4"

    # --- 2. Generate palette for clean GIF ---
    ffmpeg -i "$OUT_MP4" -vf palettegen -y "$PALETTE"

    # --- 3. Convert to GIF using palette ---
    ffmpeg -i "$OUT_MP4" -i "$PALETTE" \
        -lavfi paletteuse \
        -y "$OUT_GIF"

    # Remove palette file (optional)
    rm "$PALETTE"

    echo "Done: $BASENAME → MP4 + GIF"
    echo ""
done

echo "All videos processed!"



    