import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge, blocks } from '../../utils/index.mjs'

console.clear()
// console.log('\n\n\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
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

const isInSprite = (cycle, spritePos) =>
  (cycle % 40) - 1 >= (spritePos - 1)
    &&
  (cycle % 40) - 1 <= (spritePos + 1)

const drawSprite = (x) => {
  let str = ''
  for (let i = 0; i <= x + 3; i++) {
    if (i >= x - 1 && i <= x + 1) str += "#"
    else str += "."
  }
  console.log('S:', str)
}

const part2 = () => {
  const p2input = [...input]
  let newInstruction = true
  let currentInstruction;
  let x = 1
  let NUMBER_OF_CYCLES = 240
  let crtDisplay = ''
  for (let cycle = 1; cycle <= NUMBER_OF_CYCLES; cycle++) {
    if (cycle % 40 === 1) {
      crtDisplay += '\n'
    }
    if (newInstruction) {
      currentInstruction = p2input.pop()
      if (currentInstruction === 'noop') {
        newInstruction = true
        if (isInSprite(cycle, x)) {
          crtDisplay += blocks.full
        } else {
          crtDisplay += blocks.empty
        }
        // console.log(`\n---- ${cycle} ----`)
        // console.log('I:', currentInstruction)
        // console.log('x:', x)
        // console.log('D:', crtDisplay)
        // drawSprite(x)
        // console.log(`--------`)
        continue
      } else {
        newInstruction = false
        if (isInSprite(cycle, x)) {
          crtDisplay += blocks.full
        } else {
          crtDisplay += blocks.empty
        }
        // console.log(`\n---- ${cycle} ----`)
        // console.log('I:', currentInstruction)
        // console.log('x:', x)
        // console.log('D:', crtDisplay)
        // drawSprite(x)
        // console.log(`--------`)
        continue
      }
    }
    
    if (!newInstruction) {
      if (isInSprite(cycle, x)) {
        crtDisplay += blocks.full
      } else {
        crtDisplay += blocks.empty
      }
      // console.log(`\n---- ${cycle} ----`)
      // console.log('I:', currentInstruction)
      // console.log('x:', x)
      // console.log('D:', crtDisplay)
      // drawSprite(x)
      // console.log(`--------`)
      newInstruction = true
      x += currentInstruction
      continue
    }
  }
  return crtDisplay
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