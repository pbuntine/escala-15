#!/bin/bash

# Usage: ./copy_files.sh <source_directory> <destination_directory>

# Check for correct number of arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <source_directory> <destination_directory>"
    exit 1
fi

SOURCE_DIR=$1
DEST_DIR=$2

# Ensure the source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Source directory does not exist: $SOURCE_DIR"
    exit 1
fi

# Create the destination directory if it does not exist
mkdir -p "$DEST_DIR"

# Copy files and directories matching the patterns
patterns=(
    ".env.development"
    ".env.production"
    ".env.development.local"
    "package.json"
    "package-lock.json"
    "public/"
    "src/components/presentation/context/"
    "src/components/presentation/_custom/"
    "src/components/transformation/_custom/"
    "src/components/extraction/_custom/"
    "src/styles/custom.css"
    "src/styles/_custom/"
    "src/types/custom-types.d.ts"
    "src/types/cf-type.d.ts"
    "src/types/cf-types.ts"
)

# Create directories in the destination path if they don't exist
for pattern in "${patterns[@]}"; do
    if [[ "$pattern" == */ ]]; then
        mkdir -p "$DEST_DIR/$pattern"
    fi
done

echo "Starting copy process..."

for pattern in "${patterns[@]}"; do
    cp -r "$SOURCE_DIR/$pattern" "$DEST_DIR/$pattern"
    echo "Copied: $pattern"

done

echo "Copy process completed."