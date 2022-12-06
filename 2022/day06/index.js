import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)

const memo = {
  /*
  0: 'a',
  1: 'b',
  3: 'c',
  */
}

const detectFirstMarker = (numberOfConsecutiveCharacters) => {
  for (let i = numberOfConsecutiveCharacters; i < input.length; i++) {
    const all = new Set()
    for (let j = i; j > i - numberOfConsecutiveCharacters; j--) {
      if (!memo[j]) memo[j] = input[j]
      all.add(input[j])
    }
    if (all.size === numberOfConsecutiveCharacters) {
      return i+1
    }
  }
  throw new Error(`Couldn't find ${numberofConsecutiveCharacters} consecutive characters.`)
}

const part1 = () => detectFirstMarker(4)
const part2 = () => detectFirstMarker(14)

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