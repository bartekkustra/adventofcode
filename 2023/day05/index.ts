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
interface parsedInput {
  seeds: number[]
  rest: Map<string, Conversion[]>
}

export const parsedInput = (ext: string): parsedInput => {
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

export const part1 = (input: parsedInput): number => {
  const seeds = input.seeds
  let lowest = Infinity

  seeds.forEach((seed: number) => {
    const seed2soil = getNextType('seed-to-soil', seed, input.rest)
    const soil2fertilizer = getNextType('soil-to-fertilizer', seed2soil, input.rest)
    const fertilizer2water = getNextType('fertilizer-to-water', soil2fertilizer, input.rest)
    const water2light = getNextType('water-to-light', fertilizer2water, input.rest)
    const light2temperature = getNextType('light-to-temperature', water2light, input.rest)
    const temperature2humidity = getNextType('temperature-to-humidity', light2temperature, input.rest)
    const humidity2location = getNextType('humidity-to-location', temperature2humidity, input.rest)

    // console.log({
    //   seed: input.seeds[0],
    //   soil: seed2soil,
    //   fertilizer: soil2fertilizer,
    //   water: fertilizer2water,
    //   light: water2light,
    //   temperature: light2temperature,
    //   humidity: temperature2humidity,
    //   location: humidity2location,
    // })
    lowest = Math.min(lowest, humidity2location)
  })


  return lowest
}

export const part2 = (input: parsedInput): number => {
  const seedsPairs: [number, number][] = []
  input.seeds.forEach((seed, index) => {
    if (index % 2 === 0) {
      seedsPairs.push([seed, input.seeds[index + 1]])
    }
  })
 
  let lowest = Infinity
  
  for (const [start, range] of seedsPairs) {
    for (let i = start; i < start + range; i++) {
      const seed2soil = getNextType('seed-to-soil', i, input.rest)
      const soil2fertilizer = getNextType('soil-to-fertilizer', seed2soil, input.rest)
      const fertilizer2water = getNextType('fertilizer-to-water', soil2fertilizer, input.rest)
      const water2light = getNextType('water-to-light', fertilizer2water, input.rest)
      const light2temperature = getNextType('light-to-temperature', water2light, input.rest)
      const temperature2humidity = getNextType('temperature-to-humidity', light2temperature, input.rest)
      const humidity2location = getNextType('humidity-to-location', temperature2humidity, input.rest)
      lowest = Math.min(lowest, humidity2location)
    }
  }
  return lowest
}

const main = () => {
  const p0start = performance.now()
  const p0 = parsedInput('in')
  const p0end = performance.now()

  const p1start = performance.now()
  const p1 = part1(parsedInput('sample'))
  const p1end = performance.now()
  
  const p2start = performance.now()
  const p2 = part2(parsedInput('sample'))
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
