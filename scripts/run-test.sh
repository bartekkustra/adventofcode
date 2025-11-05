#!/bin/bash

# Run tests for a specific Advent of Code day
# Usage: npm run test:day <year> <day>
# Example: npm run test:day 2025 1

set -e  # Exit on error

# Check arguments
if [ $# -lt 2 ]; then
  echo "Usage: npm run test:day <year> <day>"
  echo "Example: npm run test:day 2025 1"
  exit 1
fi

YEAR=$1
DAY=$(printf "%02d" $2)
TARGET_DIR="$YEAR/day$DAY"
TEST_FILE="$TARGET_DIR/day$DAY.test.ts"

# Check if test file exists
if [ ! -f "$TEST_FILE" ]; then
  echo "❌ Test file not found: $TEST_FILE"
  exit 1
fi

echo "🧪 Running tests for $YEAR Day $DAY..."
npx jest --watch "$TEST_FILE"
