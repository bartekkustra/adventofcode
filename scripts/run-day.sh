#!/bin/bash

# Run a specific Advent of Code day with hot reload
# Usage: npm run day <year> <day>
# Example: npm run day 2025 1

set -e  # Exit on error

# Check arguments
if [ $# -lt 2 ]; then
  echo "Usage: npm run day <year> <day> [debug]"
  echo "Example: npm run day 2025 1"
  echo "         npm run day 2025 1 debug"
  exit 1
fi

YEAR=$1
DAY=$(printf "%02d" $2)
DEBUG=${3:-""}
TARGET_DIR="$YEAR/day$DAY"
MAIN_FILE="$TARGET_DIR/day$DAY.ts"

# Check if directory exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ Directory not found: $TARGET_DIR"
  echo "Create it with: npm run new $YEAR $2"
  exit 1
fi

# Check if main file exists
if [ ! -f "$MAIN_FILE" ]; then
  echo "❌ Main file not found: $MAIN_FILE"
  exit 1
fi

# Build nodemon command
if [ "$DEBUG" = "debug" ]; then
  echo "🐛 Running in debug mode (port 9229)"
  npx nodemon --watch "$TARGET_DIR" --ext "ts,txt" --exec "node --inspect --loader ts-node/esm" "$MAIN_FILE"
else
  echo "🎄 Running $YEAR Day $DAY with hot reload..."
  npx nodemon --watch "$TARGET_DIR" --ext "ts,txt" --exec "ts-node" "$MAIN_FILE"
fi
