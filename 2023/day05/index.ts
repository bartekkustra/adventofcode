import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()

const year = 2023
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`


interface Conversion {
  destinationRangeStart: number
  sourceRangeStart: number
  rangeLength: number
}

interface ParsedInput {
  seeds: number[]
  rest: Map<string, Conversion[]>
}

interface Range {
  start: number
  end: number
}

export const parsedInput = (ext: string): ParsedInput => {
  const input: string[] = importFile(filename + '.' + ext).split('\n\n')
  const seeds: number[] = input[0].split(': ')[1].split(' ').map(Number)

  const rest: Map<string, Conversion[]> = new Map()

  input.slice(1).forEach(section => {
    const [key, values] = section.split(' map:\n')
    const map: Conversion[] = values
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const l = line.split(' ').map(Number)
        return {
          destinationRangeStart: l[0],
          sourceRangeStart: l[1],
          rangeLength: l[2],
        }
      })
    
    rest.set(key, map)
  })

  return { seeds, rest }
}

const getNextType = (conversion: string, currentValue: number, conversionMap: Map<string, Conversion[]>): number => {
  const map = conversionMap.get(conversion)
  let possibleNextType = currentValue
  map.forEach((range: Conversion) => {
    if (currentValue >= range.sourceRangeStart && currentValue <= range.sourceRangeStart + range.rangeLength) {
      const nextType = range.destinationRangeStart + (currentValue - range.sourceRangeStart)
      possibleNextType = nextType
    }
  })
  return possibleNextType
}

const mappingOrder = [
  'seed-to-soil',
  'soil-to-fertilizer',
  'fertilizer-to-water',
  'water-to-light',
  'light-to-temperature',
  'temperature-to-humidity',
  'humidity-to-location',
]

export const part1 = (input: ParsedInput): number => {
  const seeds = input.seeds
  let lowest = Infinity

  seeds.forEach((seed: number) => {
    let current = seed
    mappingOrder.forEach((mapName: string) => {
      current = getNextType(mapName, current, input.rest)
    })
    
    lowest = Math.min(lowest, current)
  })

  return lowest
}

const processRanges = (inputRanges: Range[], conversions: Conversion[]): Range[] => {
  const outputRanges: Range[] = []

  for (const range of inputRanges) {
    let unprocessedRanges: Range[] = [range]

    for (const conversion of conversions) {
      const conversionEnd = conversion.sourceRangeStart + conversion.rangeLength - 1
      const newUnprocessed: Range[] = []

      for (const current of unprocessedRanges) {
        // before conversion range
        if (current.start < conversion.sourceRangeStart) {
          newUnprocessed.push({
            start: current.start,
            end: Math.min(current.end, conversion.sourceRangeStart - 1)
          })
        }

        // overlapping range
        if (current.end >= conversion.sourceRangeStart && current.start <= conversionEnd) {
          const overlapStart = Math.max(current.start, conversion.sourceRangeStart)
          const overlapEnd = Math.min(current.end, conversionEnd)
          outputRanges.push({
            start: conversion.destinationRangeStart + overlapStart - conversion.sourceRangeStart,
            end: conversion.destinationRangeStart + overlapEnd - conversion.sourceRangeStart,
          })
        }

        // after conversion range
        if (current.end > conversionEnd) {
          newUnprocessed.push({
            start: Math.max(current.start, conversionEnd + 1),
            end: current.end,
          })
        }
      }

      unprocessedRanges = newUnprocessed
    }

    // add the remaining ranges to the output
    outputRanges.push(...unprocessedRanges)
  }

  return outputRanges
}

export const part2 = (input: ParsedInput): number => {
  const seedRanges: Range[] = []

  for (let i = 0; i < input.seeds.length; i += 2) {
    seedRanges.push({
      start: input.seeds[i],
      end: input.seeds[i] + input.seeds[i + 1] - 1,
    })
  }

  let currentRanges = seedRanges
  for (const mapName of mappingOrder) {
    currentRanges = processRanges(currentRanges, input.rest.get(mapName))
  }

  return Math.min(...currentRanges.map(r => r.start))
}

const main = () => {
  const p0start = performance.now()
  const p0 = parsedInput('in')
  const p0end = performance.now()

  const p1start = performance.now()
  const p1 = part1(parsedInput('in'))
  const p1end = performance.now()
  
  const p2start = performance.now()
  const p2 = part2(parsedInput('in'))
  const p2end = performance.now()
  
  const p0time = (p0end - p0start).toFixed(3)
  const p1time = (p1end - p1start).toFixed(3)
  const p2time = (p2end - p2start).toFixed(3)
  console.log(`input: ${p0time}ms`)
  console.log('---')
  console.log(`part1: ${p1time}ms`)
  console.log('part1', p1)
  console.log(`part2: ${p2time}ms`)
  console.log('part2', p2)
  
  // updateTimes(p1time, p2time, dir)
  // updateMainBadge(year, day, {p1, p2})
}

if (require.main === module) {
  main()
}
