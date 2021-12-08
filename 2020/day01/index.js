import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`

let input = importFile(dir, filename).split('\n').map(x => parseInt(x, 10)).sort((a, b) => a - b)

const part1 = () => {
  let left = 0
  let right = input.length - 1
  while(true) {
    const iLeft = input[left]
    const iRight = input[right]
    const sum = iLeft + iRight
    if(sum === 2020) return iLeft * iRight
    if(sum < 2020) left++
    if(sum > 2020) right--
    if(left > right) return false
  }
  return false
}

const part2 = () => {
  for(let i = 0; i < input.length - 2; i++) {
    for(let j = i + 1; j < input.length - 1; j++) {
      for(let k = i + 2; k < input.length; k++) {
        if(input[i] + input[j] + input[k] === 2020) {
          return input[i] * input[j] * input[k]
        }
      }
    }
  }
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
updateMainBadge(2020, day, {p1, p2})