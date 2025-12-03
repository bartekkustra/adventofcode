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
  return raw.split(',').map(x => {
    const [start, end] = x.split('-').map(Number)
    return {start, end}
  })
}

export const findSequencePart1 = (row: { start: number, end: number }): number => {
  const {start, end} = row
  let sum = 0
  for (let i = start; i <= end; i++) {
    const size = i.toString().length
    if(size % 2 !== 0) continue;
    const split = size/2
    const left = Math.floor(i / (10**split))
    const right = i % (10**split)
    // console.log({i, left, right, size, split})
    if (left !== right) continue;
    sum += i
  }
  return sum
}

type TCache = Map<number, number[]>
export const findSequencePart2 = (row: { start: number, end: number }): number => {
  const cache:TCache = new Map()
  const {start, end} = row
  const allDivisiblesOfNumber = (n: number): number[] => {
    let divisions = []
    for (let i = 2; i <= n; i++) {
      if (n % i === 0) divisions.push(i)
    }
    return divisions
  }

  const uniques = new Set<number>()
  for (let i = start; i <= end; i++) {
    const size = i.toString().length
    const divisions = ((): number[] => {
      if (cache.has(size)) return cache.get(size)
      cache.set(size, allDivisiblesOfNumber(size))
      return cache.get(size)
    })()
    const valueAsString = i.toString()
    for (const divisor of divisions) {
      let pointers: Record<number, number> = {}
      let pointer = 0
      while(true) {
        if (pointer >= size) break
        pointers[pointer] = pointer
        pointer += size/divisor
      }
      let pointerOffset = 0
      let isOk = true
      while(pointerOffset < size/divisor && isOk) {
        // const pointerstemp = Object.values(pointers)
        // console.log({divisor, pointerstemp, pointerOffset})
        if (!Object.values(pointers).every(x => valueAsString[x + pointerOffset] === valueAsString[0 + pointerOffset])) isOk = false
        // if (isOk) debugger
        // isOk ? console.log({isOk, divisor, i}) : null
        pointerOffset++
      }
      if (isOk) {
        uniques.add(i)
      }
    }
  }
  // console.log([...uniques])
  return [...uniques].reduce((acc:number, v:number) => acc + v, 0)
}

// Part 1
export const part1 = (input: Input): number => {
  let sum = 0
  for (const row of input) {
   sum += findSequencePart1(row)
  }
  return sum
}

// Part 2
export const part2 = (input: Input): number => {
  let sum = 0
  // sum += findSequencePart2({start: 222220, end: 222220 })
  sum += input.reduce((acc: number, curr: {start: number, end: number}) => acc + findSequencePart2(curr), 0)
  return sum
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
