#!/bin/bash

# Check if both year and day are provided
if [$# -ne 2 ]; then
  echo "Usage: ./newDay.sh <year> <day>"
  echo "Example: ./newDay.sh 2024 01"
  exit 1
fi

YEAR=$1
DAY=$(printf "%02d" $2)
TEMPLATE_DIR="$YEAR/_template"
TARGET_DIR="$YEAR/day$DAY"

# Create directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Copy template files with proper naming
cp "$TEMPLATE_DIR/00.in" "$TARGET_DIR/$DAY.in"
cp "$TEMPLATE_DIR/00.sample" "$TARGET_DIR/$DAY.sample"
cp "$TEMPLATE_DIR/index.ts" "$TARGET_DIR/index.ts"
cp "$TEMPLATE_DIR/index.test.ts" "$TARGET_DIR/index.test.ts"
cp "$TEMPLATE_DIR/README.md" "$TARGET_DIR/README.md"

echo "Created new day $DAY in $YEAR"
