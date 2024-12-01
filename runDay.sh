#!/bin/bash

YEAR=$1
DAY=$(printf "%02d" $2)

if [ -z "$DAY" ]; then
  echo "Please provide both year and day arguments"
  echo "Example: npm run day 2023 01"
  exit 1
fi

npx nodemon --watch "$YEAR/day$DAY" --ext "ts" --exec "ts-node" "$YEAR/day$DAY/index.ts"
