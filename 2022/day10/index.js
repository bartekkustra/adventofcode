import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.sample2`
let input = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n')
  .map(x => {
    if (x === 'noop') return 'noop'
    return Number(x.split(' ')[1])
  }).reverse()

const part1 = () => {
  const p1input = [...input]
  let newInstruction = true
  let currentInstruction;
  let x = 1
  let NUMBER_OF_CYCLES = 220
  let overallSignalStrength = 0
  for (let cycle = 1; cycle <= NUMBER_OF_CYCLES; cycle++) {
    if ((cycle % 40) - 20 === 0) {
      overallSignalStrength += cycle * x
    }
    if (newInstruction) {
      currentInstruction = p1input.pop()
      if (currentInstruction === 'noop') {
        continue
      } else {
        newInstruction = false
        continue
      }
    }

    if (!newInstruction) {
      newInstruction = true
      x += currentInstruction
    }
  }
  return overallSignalStrength
}

const part2 = () => {
  const p2input = [...input]
  let newInstruction = true
  let currentInstruction;
  let x = 1
  let NUMBER_OF_CYCLES = 220
  let overallSignalStrength = 0
  for (let cycle = 1; cycle <= NUMBER_OF_CYCLES; cycle++) {
    if ((cycle % 40) - 20 === 0) {
      overallSignalStrength += cycle * x
    }
    if (newInstruction) {
      currentInstruction = p2input.pop()
      if (currentInstruction === 'noop') {
        continue
      } else {
        newInstruction = false
        continue
      }
    }

    if (!newInstruction) {
      newInstruction = true
      x += currentInstruction
    }
  }
  return 0
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