#!/bin/zsh

# === INPUT/OUTPUT DIR ===
INPUT_DIR="/Users/oliverkiranbrown/Documents/Balloon Tomb/Website Assets/Thunderbolt Nov 2025/to_crunch"
OUTPUT_DIR="/Users/oliverkiranbrown/Documents/Balloon Tomb/Website Assets/Thunderbolt Nov 2025/weak_crunched"

# Loop through the .mov files in the input dir
for FILE in $INPUT_DIR/*.(jpg|JPG|jpeg|JPEG)(N); do
    
    # Filename without extension
    RAW_NAME=$(basename "$FILE")
    BASENAME="${RAW_NAME:r}"

    echo "Processing: $BASENAME"

    # Output image
    OUT_IMG="$OUTPUT_DIR/${BASENAME}_pixelated.jpg"

    # --- Convert to grayscale + pixelated 8-bit img ---
    ffmpeg -i "$FILE" \
        -vf "format=gray,scale=iw/20:ih/20:flags=neighbor,scale=iw*20:ih*20:flags=neighbor,format=y8" \
        -y "$OUT_IMG"

    echo "Done: $BASENAME → pixelated grayscaled image"
    echo ""
done

echo "All videos processed!"



    