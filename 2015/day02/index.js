import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const year = 2015
const day = getDay(import.meta.url)
const dir = `${year}/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n')
  .map(x => x.split('x'))

const part1 = () => {
  let total = 0
  input.forEach(present => {
    const [l, w, h] = present
    const lw = l * w
    const lh = l * h
    const wh = w * h
    const minSize = [lw, lh, wh].sort((a, b) => a - b)[0]
    const paperNeeded = 2*lw + 2*wh + 2*lh + minSize
    total += paperNeeded
  })
  return total
}

const part2 = () => {
  let total = 0
  input.forEach(present => {
    const [l, w, h] = present
    const [minOne, minTwo] = present.sort((a, b) => a - b)
    const ribbonNeeded = 2*minOne + 2*minTwo + (l*w*h)
    total += ribbonNeeded
  })
  return total
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