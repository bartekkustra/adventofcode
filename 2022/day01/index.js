import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const year = 2022
const day = getDay(import.meta.url)
const dir = `${year}/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n\n').map(x => x.split('\n').map(Number))


// oneline version that I don't like but it works
// const part1 = () => Math.max(...input.map(x => x.reduce((prev, curr) => prev + curr)))

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
  let first = -Infinity
  let second = -Infinity
  let third = -Infinity

  for (const elf of input) {
    let el = elf.reduce((prev, curr) => prev + curr)
    if (el > first) {
      third = second
      second = first
      first = el
    } else if (el > second) {
      third = second
      second = el
    } else if (el > third) {
      third = el
    }
  }

  return first + second + third
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