import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const year = 2022
const day = getDay(import.meta.url)
const dir = `${year}/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n\n').map(x => x.split('\n').map(Number))

const part1 = () => {
  let most = 0
  for (const elf of input) {
    const sum = elf.reduce((prev, curr) => prev + curr)
    if (sum > most) most = sum
  }
  return most
}

const part2 = () => {
  let elfs = []
  for (const elf of input) {
    elfs.push(elf.reduce((prev, curr) => prev + curr))
  }
  return elfs.sort((a, b) => b - a).slice(0, 3).reduce(((prev, curr) => prev + curr), 0)
}

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p2start = performance.now()
const p2 = part2()
const p2end = performance.now()

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(year, day, {p1, p2})