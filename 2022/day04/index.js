import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n')
  .map(x => x.split('\n').map(y => y.split(',').map(z => z.split('-').map(Number))))

const isBetween = (min, max, value) => {
  return value >= min && value <= max
}

const loopCountsBoth = (a, b) => {
  return (a[0] >= b[0] && a[1] <= b[1]) || 
  for (let i = a[0]; i <= a[1]; i++) {
    if (isBetween(b[0], b[1], i)) {
      within.push(true)
    } else {
      within.push(false)
    }
  }
  return within.every(x => x === true)
}

const loopChecksTrueOnce = (a, b) => {
  let overlaps = false
  for (let i = a[0]; i <= a[1]; i++) {
    if (isBetween(b[0], b[1], i)) overlaps = true
  }
  return overlaps
}

const part1 = () => {
  let count = 0
  for (const pair of input) {
    for (const [first, second] of pair) {
      if (loopCountsBoth(first, second) || loopCountsBoth(second, first)) count++
    }
  }
  return count
}

const part2 = () => {
  let count = 0
  for (const pair of input) {
    for (const [first, second] of pair) {
      if(loopChecksTrueOnce(first, second) || loopChecksTrueOnce(first, second)) count++
    }
  }
  
  return count
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
updateMainBadge(2022, day, {p1, p2})