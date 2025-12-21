#!/bin/bash
# Converts all webm files in ./audio to mp3 in ./audio_mp3

mkdir -p ./audio_mp3

for f in ./audio/*.webm; do
    filename=$(basename "$f" .webm)
    echo "Converting $f to ./audio_mp3/$filename.mp3"
    ffmpeg -y -i "$f" "./audio_mp3/$filename.mp3"
done

echo "Conversion complete!"
