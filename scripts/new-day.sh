#!/bin/bash

# Create a new Advent of Code day from template
# Usage: npm run new <year> <day>
# Example: npm run new 2025 1

set -e  # Exit on error

# Check arguments
if [ $# -ne 2 ]; then
  echo "Usage: npm run new <year> <day>"
  echo "Example: npm run new 2025 1"
  exit 1
fi

YEAR=$1
DAY=$(printf "%02d" $2)
TEMPLATE_DIR="template"
YEAR_DIR="$YEAR"
TARGET_DIR="$YEAR/day$DAY"

# Validate year directory exists
if [ ! -d "$YEAR_DIR" ]; then
  echo "Creating year directory: $YEAR_DIR"
  mkdir -p "$YEAR_DIR"
fi

# Check if day already exists
if [ -d "$TARGET_DIR" ]; then
  echo "❌ Directory $TARGET_DIR already exists"
  exit 1
fi

# Check if template exists
if [ ! -d "$TEMPLATE_DIR" ]; then
  echo "❌ Template directory not found: $TEMPLATE_DIR"
  exit 1
fi

# Create target directory
mkdir -p "$TARGET_DIR"

# Copy and rename template files
cp "$TEMPLATE_DIR/day.ts" "$TARGET_DIR/day$DAY.ts"
cp "$TEMPLATE_DIR/day.test.ts" "$TARGET_DIR/day$DAY.test.ts"
cp "$TEMPLATE_DIR/input.txt" "$TARGET_DIR/input.txt"
cp "$TEMPLATE_DIR/sample.txt" "$TARGET_DIR/sample.txt"

# Update year and day in the copied files
sed -i.bak "s/const year = YYYY/const year = $YEAR/" "$TARGET_DIR/day$DAY.ts"
sed -i.bak "s/YYYY/$YEAR/" "$TARGET_DIR/day$DAY.test.ts"
sed -i.bak "s/dayXX/day$DAY/" "$TARGET_DIR/day$DAY.test.ts"
rm "$TARGET_DIR/day$DAY.ts.bak" "$TARGET_DIR/day$DAY.test.ts.bak"

echo "✅ Created $TARGET_DIR"
echo ""
echo "Next steps:"
echo "  1. Add puzzle input to: $TARGET_DIR/input.txt"
echo "  2. Add sample input to: $TARGET_DIR/sample.txt"
echo "  3. Run with: npm run day $YEAR $2"
