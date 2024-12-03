import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()

const year = 2024
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

type Input = any

export const parsedInput = (ext: string): Input => importFile(filename + '.' + ext)


export const part1 = (input: Input): number => input
  .match(/mul\(\d+,\d+\)/g)
  .map((s: string) => s.match(/\d+/g).map(Number))
  .reduce((acc: number, [a, b]: number[]) => acc + a * b, 0)

export const part2 = (input: Input): number => {
  const inp = input.match(/(mul\(\d+,\d+\))|(don't\(\))|(do\(\))/g)
  let mulEnabled = true
  let mulSum = 0
  for (const instruction of inp) {
    if (instruction === 'don\'t()') mulEnabled = false
    if (instruction === 'do()') mulEnabled = true
    if (mulEnabled && instruction.startsWith('mul')) {
      const [a, b] = instruction.match(/\d+/g).map(Number)
      mulSum += a * b
    }
  }

  return mulSum
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
