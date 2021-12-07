import { performance } from 'perf_hooks'
import { importFile, updateTimes } from '../../utils/index.mjs'

console.clear()

const day = '06'
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split(',').map(Number)
let fishes = new Map()
input.forEach(el => {
  if(fishes.has(el)) {
    const curr = fishes.get(el)
    fishes.set(el, curr + 1)
  } else {
    fishes.set(el, 1)
  }
})

let p1fishes = new Map(fishes)
let p2fishes = new Map(fishes)

const part1 = () => {
  for (let day = 1; day <= 80; day++) {
    const newFishes = new Map()
    p1fishes.forEach((count, daysLeft) => {
      if (daysLeft === 0) {
        const currSix = newFishes.get(6) || 0
        const currEight = newFishes.get(8) || 0
        newFishes.set(6, currSix + count)
        newFishes.set(8, currEight + count)
      } else {
        const d = daysLeft - 1
        const curr = newFishes.get(d) || 0
        newFishes.set(d, curr + count)
      }
    })
    p1fishes = newFishes
  }
  let sum = 0
  p1fishes.forEach(el => sum += el)
  return sum
}

const part2 = () => {
  for (let day = 1; day <= 256; day++) {
    const newFishes = new Map()
    p2fishes.forEach((count, daysLeft) => {
      if (daysLeft === 0) {
        const currSix = newFishes.get(6) || 0
        const currEight = newFishes.get(8) || 0
        newFishes.set(6, currSix + count)
        newFishes.set(8, currEight + count)
      } else {
        const d = daysLeft - 1
        const curr = newFishes.get(d) || 0
        newFishes.set(d, curr + count)
      }
    })
    p2fishes = newFishes
  }
  let sum = 0
  p2fishes.forEach(el => sum += el)
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