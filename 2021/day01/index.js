import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\n').map(x => parseInt(x, 10))

console.clear()

const part1 = () => {
  let sum = 0
  for(let i = 1; i < input.length; i++) {
    if (input[i-1] < input[i]) sum++
  }
  return sum
}

const part2 = () => {
  let measurements = []
  for(let i = 2; i < input.length; i++) {
    const measurementWindow = [input[i-2], input[i-1], input[i]]
    const sumOfMeasurementWindow = measurementWindow.reduce((prev, curr) => prev + curr)
    measurements.push(sumOfMeasurementWindow)
  }

  let sum = 0
  for (let i = 1; i < measurements.length; i++) {
    if (measurements[i-1] < measurements[i]) sum++
  }

  return sum
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
if (p1 !== 0) updateMainBadge(2021, day, 'p1')
if (p2 !== 0) updateMainBadge(2021, day, 'p2')