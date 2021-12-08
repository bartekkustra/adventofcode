import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let [card, door] = importFile(dir, filename).replace(/\r/g, '').split('\n').map(Number)

const SUBJECT = 7
const part1 = () => {
  // Python is so much faster... :|
  const transform = (x, z) => {
    return Math.pow(x, z) % 20201227
  }

  let cardLoopSize = 1
  while(transform(SUBJECT, cardLoopSize) != card) {
    cardLoopSize++
  }

  let doorLoopSize = 1
  while(transform(SUBJECT, doorLoopSize) != door) {
    doorLoopSize++
  }

  return {cardLoopSize, doorLoopSize}
}

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p1time = (p1end - p1start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
p2 = false

updateTimes(p1time, 0, dir)
updateMainBadge(2020, day, {p1, p2})