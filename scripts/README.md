# Advent of Code Scripts

This directory contains all the utility scripts for managing Advent of Code solutions.

## Available Scripts

### 🎁 `new-day.sh` - Create a new day

Creates a new day directory from the centralized template with proper file naming.

**Usage:**
```bash
npm run new <year> <day>

# Examples:
npm run new 2025 1
npm run new 2025 15
```

**What it does:**
- Creates `YYYY/dayXX/` directory
- Copies template files
- Renames files appropriately (`day01.ts`, `day01.test.ts`, etc.)
- Updates year constants in the files
- Creates empty `input.txt` and `sample.txt` files

**Next steps after running:**
1. Add your puzzle input to `input.txt`
2. Add the sample input from the puzzle description to `sample.txt`
3. Update expected results in the test file
4. Start coding with `npm run day <year> <day>`

---

### 🏃 `run-day.sh` - Run a day with hot reload

Runs a specific day's solution with hot reload enabled. Any changes to TypeScript or text files will trigger an automatic re-run.

**Usage:**
```bash
npm run day <year> <day>

# Examples:
npm run day 2025 1
npm run day 2024 12

# Debug mode (attaches debugger on port 9229):
npm run day <year> <day> debug
```

**Features:**
- Hot reload via nodemon
- Watches `.ts` and `.txt` files
- Automatically reruns on file changes
- Optional debug mode for VS Code debugging

---

### 🧪 `run-test.sh` - Run tests for a day

Runs Jest tests in watch mode for a specific day.

**Usage:**
```bash
npm run test:day <year> <day>

# Examples:
npm run test:day 2025 1
npm run test:day 2024 5
```

**Features:**
- Watch mode enabled by default
- Reruns tests on file changes
- Great for TDD workflow

---

### 🎯 `run-all.sh` - Run all days in a year

Dynamically finds and runs all completed days in a specific year sequentially.

**Usage:**
```bash
npm run all <year>

# Examples:
npm run all 2025
npm run all 2024
```

**Features:**
- Automatically discovers all `dayXX` directories
- Runs them in order
- Shows progress counter
- Displays results for each day

---

## Typical Workflow

### Starting a new day

```bash
# 1. Create the day
npm run new 2025 1

# 2. Add inputs
# - Paste puzzle input into 2025/day01/input.txt
# - Paste sample input into 2025/day01/sample.txt
# - Update SAMPLE_RESULTS in 2025/day01/day01.test.ts

# 3. Start coding with hot reload
npm run day 2025 1

# 4. Run tests (in another terminal)
npm run test:day 2025 1
```

### Development cycle

1. Edit `day01.ts` - implement part 1
2. File saves → nodemon auto-reruns → see output immediately
3. Check sample results match expected values
4. Run with actual input
5. Repeat for part 2

### After completing all days

```bash
# Run all solutions for the year
npm run all 2025
```

---

## File Structure

Each day follows this structure:

```
YYYY/dayXX/
├── dayXX.ts       # Main solution file
├── dayXX.test.ts  # Jest test file
├── input.txt      # Your actual puzzle input
└── sample.txt     # Sample input from puzzle description
```

---

## Performance Tracking

Performance tracking (badges) is **opt-in** in the new template. To enable:

1. Open `dayXX.ts`
2. Set `TRACK_PERFORMANCE = true`
3. Run your solution

This will:
- Update `utils/completion.json`
- Generate badges in `.github/badges/`
- Track completion status

---

## Debugging

### VS Code Debugging

1. Start day in debug mode:
   ```bash
   npm run day 2025 1 debug
   ```

2. In VS Code, go to Run & Debug panel

3. Select "Attach to Node" configuration

4. Set breakpoints in your code

5. Debug as normal!

---

## Script Maintenance

All scripts are written in bash for macOS/Linux compatibility. They include:

- Input validation
- Error messages with usage examples
- Progress indicators
- Helpful emoji for visual feedback

If you need to modify a script, they're located in the `scripts/` directory.
