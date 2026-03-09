#!/bin/bash
#
# Generate responsive image thumbnails using ImageMagick
# Usage: ./scripts/generate-thumbnails.sh
#

set -e

IMAGES_DIR="public/images"
SIZES=(400 800 1200)

# Check for ImageMagick
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick 'convert' command not found"
    echo "Install with: brew install imagemagick (macOS) or apt install imagemagick (Linux)"
    exit 1
fi

# Create images directory if needed
mkdir -p "$IMAGES_DIR"

# Process each image
for img in "$IMAGES_DIR"/*.{png,jpg,jpeg,PNG,JPG,JPEG} 2>/dev/null; do
    [ -f "$img" ] || continue

    basename="${img%.*}"
    ext="${img##*.}"

    echo "Processing: $img"

    # Generate WebP versions at different sizes
    for size in "${SIZES[@]}"; do
        output="${basename}-${size}w.webp"
        if [ ! -f "$output" ] || [ "$img" -nt "$output" ]; then
            convert "$img" -resize "${size}x" -quality 85 "$output"
            echo "  Created: $output"
        fi
    done

    # Generate full-size WebP
    webp_output="${basename}.webp"
    if [ ! -f "$webp_output" ] || [ "$img" -nt "$webp_output" ]; then
        convert "$img" -quality 85 "$webp_output"
        echo "  Created: $webp_output"
    fi
done

echo "Done!"
