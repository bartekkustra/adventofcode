import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()

const year = 2023
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

type MapKey = 'Time' | 'Distance'
type Input = Map<MapKey, number[]>

export const parsedInput = (ext: string): Input => {
  const result = new Map()
  
  importFile(filename + '.' + ext)
    .split('\n')
    .forEach((line: string) => {
      const [time, ...distances] = line.split(/\s+/)
      result.set(time.replace(':', ''), distances.map(Number))
    })
  
  return result
}

export const calculateDistance = (holdTime: number, maxTime: number): number => holdTime * (maxTime - holdTime)
export const solveFormula = (time: number, distanceToBeat: number): number => {
  /*
    Hold time (h) * remaining time (T - h) > distance to beat (D)
    h(T - h) > D
    -h^2 + Th > D
    -h^2 + Th - D > 0

    quadratic formula:
    -b ± √(b^2 - 4ac) / 2a
    where a = -1, b = T, c = -D
  */

  const a = -1
  const b = time
  const c = -distanceToBeat

  const delta = Math.sqrt(b * b - 4 * a * c)
  const x1 = (-b + delta) / (2 * a)
  const x2 = (-b - delta) / (2 * a)

  const start = Math.ceil(Math.min(x1, x2))
  const end = Math.floor(Math.max(x1, x2))

  return end - start + 1
}

/* works, but I don't like it

export const part1 = (input: Input): number => {
  const times = input.get('Time')
  const distances = input.get('Distance')
  let result = 1

  times.forEach((time: number, index: number) => {
    let marginOfError = 0
    for (let i = 1; i <= time; i++) {
      const distance = calculateDistance(i, time)
      if (distance > distances[index]) {
        marginOfError++
      }
    }
    
    result *= marginOfError
  })

  return result
}
*/

export const part1 = (input: Input): number => {
  const times = input.get('Time')
  const distances = input.get('Distance')
  
  return times.reduce((prev, time, index) => prev * solveFormula(time, distances[index]), 1)
}

export const part2 = (input: Input): number => {
  const time = parseInt(input.get('Time').join(''))
  const distance = parseInt(input.get('Distance').join(''))

  return solveFormula(time, distance)
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
  
  updateTimes(p1time, p2time, dir)
  updateMainBadge(year, day, {p1, p2})
}

if (require.main === module) {
  main()
}
