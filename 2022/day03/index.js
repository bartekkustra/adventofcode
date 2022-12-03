import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
let input1 = importFile(dir, filename).replace(/\r/g, '').split('\n').map(x => {
  const size = x.length
  const half = size/2
  const left = x.slice(0, half)
  const right = x.slice(half)
  return [left, right]
})
let input2 = importFile(dir, filename).replace(/\r/g, '').split('\n')

const findCharValue = (letter) => {
  let offset = 96
  if (letter.toUpperCase() === letter) {
    offset = 38
  }
  return letter.charCodeAt(0)-offset
}

const part1 = () => {
  let sum = 0
  for (const [left, right] of input1) {
    for (const letter of left) {
      if (right.includes(letter)) {
        sum += findCharValue(letter)
        break
      }
    }
  }
  return sum
}

const part2 = () => {
  let sum = 0
  for (let i = 0; i < input2.length; i = i + 3) {
    const group = [input2[i], input2[i+1], input2[i+2]]
    const memo = {
      /*
      a: new Set()
      */
    }
    for (let j = 0; j < group.length; j++) {
      const line = group[j]
      for (const letter of line) {
        const curr = memo[letter]
        if (curr) {
          curr.add(j)
          memo[letter] = curr
        }
        if (!curr) {
          memo[letter] = new Set().add(j)
        }
      }
    }

    for (const [letter, value] of Object.entries(memo)) {
      if (value.size === 3) {
        sum += findCharValue(letter)
        break
      }
    }
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
updateMainBadge(2022, day, {p1, p2})