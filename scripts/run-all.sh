#!/bin/bash

# Run all completed days for a specific year
# Usage: npm run all <year>
# Example: npm run all 2025

set -e  # Exit on error

# Check arguments
if [ $# -ne 1 ]; then
  echo "Usage: npm run all <year>"
  echo "Example: npm run all 2025"
  exit 1
fi

YEAR=$1
YEAR_DIR="$YEAR"

# Check if year directory exists
if [ ! -d "$YEAR_DIR" ]; then
  echo "❌ Year directory not found: $YEAR_DIR"
  exit 1
fi

# Find all day directories
DAYS=$(find "$YEAR_DIR" -maxdepth 1 -type d -name "day*" | sort)

if [ -z "$DAYS" ]; then
  echo "❌ No days found in $YEAR_DIR"
  exit 1
fi

# Count total days
TOTAL=$(echo "$DAYS" | wc -l | tr -d ' ')
echo "🎄 Running all $TOTAL days for $YEAR..."
echo ""

CURRENT=1
for DAY_DIR in $DAYS; do
  DAY=$(basename "$DAY_DIR")
  DAY_NUM=$(echo "$DAY" | sed 's/day//')
  MAIN_FILE="$DAY_DIR/day$DAY_NUM.ts"

  if [ -f "$MAIN_FILE" ]; then
    echo "[$CURRENT/$TOTAL] Running $DAY..."
    ts-node "$MAIN_FILE"
    echo ""
    CURRENT=$((CURRENT + 1))
  fi
done

echo "✅ Completed all days for $YEAR"
