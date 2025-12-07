import { formatTime, getDay, importFile, updateMainBadge, updateTimes } from '../../utils'
import { performance } from 'perf_hooks'

console.clear()

// Configuration
const year = 2025  // Will be replaced by new-day.sh script
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const TRACK_PERFORMANCE = false  // Set to true to update badges

// Types
type Input = any

// Parse input
export const parseInput = (raw: string): Input => {
  return raw.split('\n').map(x => x.split('').map(Number))
}

export const findHighestPair = (arr: number[]): number => {
  let left = arr[0]
  let right = arr[1]

  for (let i = 2; i < arr.length; i++) {
    const el = arr[i]
    const curr = left * 10 + right
    const potentialLeft = left * 10 + el
    const potentialRight = right * 10 + el
    if (potentialLeft > curr && potentialLeft > potentialRight) {
      right = el
    } else if (potentialRight > curr && potentialRight > potentialLeft) {
      left = right
      right = el
    } else if (potentialRight === potentialLeft && potentialRight > curr) {
      left = right
      right = el
    }
    // console.log({el, left, right})
  }

  return left * 10 + right
}

// Part 1
export const part1 = (input: Input): number => {
  let sum = 0
  // sum += findHighestPair(input[2])
  for (const battery of input) {
    // console.log('-------')
    sum += findHighestPair(battery)
  }
  return sum
}

// Part 2
export const part2 = (input: Input): number => {
  return 0
}

// Main execution
const main = () => {
  // Load inputs
  const sampleRaw = importFile(`${dir}/sample.txt`)
  const inputRaw = importFile(`${dir}/input.txt`)

  const sample = parseInput(sampleRaw)
  const input = parseInput(inputRaw)

  // Run with sample input first
  console.log('=== Sample ===')
  console.log('Part 1:', part1(sample))
  console.log('Part 2:', part2(sample))
  console.log('')

  // Run with actual input and time it
  console.log('=== Input ===')
  const t1 = performance.now()
  const p1 = part1(input)
  const t2 = performance.now()
  const p2 = part2(input)
  const t3 = performance.now()

  console.log('Part 1:', p1)
  console.log('Part 2:', p2)
  console.log('')

  const p1time = t2 - t1
  const p2time = t3 - t2
  console.log(`⏱️  Part 1: ${formatTime(p1time)}`)
  console.log(`⏱️  Part 2: ${formatTime(p2time)}`)

  // Optional: Update performance badges
  if (TRACK_PERFORMANCE) {
    updateTimes(formatTime(p1time), formatTime(p2time), dir)
    updateMainBadge(year, day, { p1, p2 })
  }
}

if (require.main === module) {
  main()
}
