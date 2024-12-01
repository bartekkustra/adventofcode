import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()

const year = 2024
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

interface Input {
  lefts: number[]
  rights: number[]
}

export const parsedInput = (ext: string): Input => {
  let lefts: number[] = []
  let rights: number[] = []
  
  importFile(filename + '.' + ext)
    .split('\n')
    .map(x => x.split('   ').map(Number))
    .forEach(([left, right]) => {
      lefts.push(left)
      rights.push(right)
    })

  return {lefts, rights}
}

export const part1 = (input: Input): number => {
  let { lefts, rights } = input
  lefts = lefts.sort((a, b) => a - b)
  rights = rights.sort((a, b) => a - b)

  return lefts.reduce((sum, left, i) => sum + Math.abs(left - rights[i]), 0)
}

export const part2 = (input: Input): number => {
  const { lefts, rights } = input
  
  const rightsMap = rights.reduce((map, r) => {
    map.set(r, (map.get(r) || 0) + 1)
    return map
  }, new Map<number, number>())

  return lefts.reduce((sum, left) => sum + left * (rightsMap.get(left) || 0), 0)
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
