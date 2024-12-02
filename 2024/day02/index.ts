import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()

const year = 2024
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

type Input = any

export const parsedInput = (ext: string): Input => importFile(filename + '.' + ext).split('\n').map(x => x.split(' ').map(Number))

const checkLineValidation = (line: number[]): boolean => {
  if (line.length < 2) return true;
  
  const isAscending = line[0] < line[1];
  
  for (let i = 1; i < line.length; i++) {
    const diff = line[i] - line[i - 1];
    
    if ((isAscending && diff <= 0) || (!isAscending && diff >= 0) || 
        Math.abs(diff) > 3 || Math.abs(diff) < 1) {
      return false;
    }
  }

  return true;
}

export const part1 = (input: Input): number => input.reduce((validCount: number, line: number[]) => validCount + (checkLineValidation(line) ? 1 : 0), 0)

export const part2 = (input: Input): number => input.reduce((validCount: number, line: number[]) => {
    if (checkLineValidation(line)) return validCount + 1

    const lineSize = line.length
    for (let i = 0; i < lineSize; i++) {
      const subLine = i === 0
        ? line.slice(1)
        : i === lineSize - 1
          ? line.slice(0, -1)
          : [...line.slice(0, i), ...line.slice(i + 1)]

      if (checkLineValidation(subLine)) {
        return validCount + 1
      }
    }
    return validCount
  }, 0)

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
