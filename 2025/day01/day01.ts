import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils'
import { performance } from 'perf_hooks'

console.clear()

// Configuration
const year = 2025  // Will be replaced by new-day.sh script
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const TRACK_PERFORMANCE = false  // Set to true to update badges

// Types
type Input = number[]

// Parse input
export const parseInput = (raw: string): Input => {
  const arr = raw.split('\n').map(x => {
    const direction = x.slice(0, 1) === 'L' ? -1 : 1
    const distance = Number(x.slice(1))
    return distance * direction
  })
  return arr
}

// Part 1
export const part1 = (input: Input): number => {
  let numberOfZeroes = 0
  let current = 50
  for (const change of input) {
    current = (current + change) % 100
    if ((current) % 100 === 0) numberOfZeroes++
  }
  
  return numberOfZeroes
}
// Part 2
export const part2 = (input: Input): number => {
  let steps = []
  let numberOfZeroes = 0
  let current = 50
  for (const change of input) {
    let rotationsPastZero = 0
    const before = Number(current)
    const after = (before + change)
    const diff = Math.abs(after - before)
    current = (100 + (after % 100)) % 100
    if (after >= 100) {
      rotationsPastZero = Math.floor(after / 100)
      numberOfZeroes += rotationsPastZero
    }
    if (after <= 0) {
      rotationsPastZero = Math.floor(Math.abs(after) / 100) + (before === 0 ? 0 : 1)
      numberOfZeroes += rotationsPastZero
    }
  }
  return numberOfZeroes
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

  const p1time = (t2 - t1).toFixed(3)
  const p2time = (t3 - t2).toFixed(3)
  console.log(`⏱️  Part 1: ${p1time}ms`)
  console.log(`⏱️  Part 2: ${p2time}ms`)

  // Optional: Update performance badges
  if (TRACK_PERFORMANCE) {
    updateTimes(p1time, p2time, dir)
    updateMainBadge(year, day, { p1, p2 })
  }
}

if (require.main === module) {
  main()
}
