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

const detectFirstMarker2 = (num) => {
  for (let i = num; i < input.length; i++) {
    const slice = input.slice((i - num), i)
    if (slice.length === new Set(slice).size) {
      return i
    }
  }
}

const detectFirstMarker3 = (num) => {
  const all = new Set()
  for (let i = 0; i < input.length; i++) {
    if (all.size > num) all.delete(input[i-num])
    all.add(input[i])
    if (all.size === num) return all
  }
  throw new Error(`Oops, something's wrong.`)
}

// APPROACH 1
// const part1 = () => detectFirstMarker(4)
// const part2 = () => detectFirstMarker(14)

// APPROACH 2
// const part1 = () => detectFirstMarker2(4)
// const part2 = () => detectFirstMarker2(14)

// APPROACH 3
const part1 = () => Array.from(detectFirstMarker3(4)).flat().join('')
const part2 = () => Array.from(detectFirstMarker3(14)).flat().join('')

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