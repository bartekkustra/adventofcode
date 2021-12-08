import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n').map(Number).sort((a, b) => a - b)
const max = input[input.length - 1]
input.push(max + 3)
input.unshift(0)

const part1 = () => {
  let n1 = 0
  let n3 = 0

  for (let i = 0; i < input.length - 1; i++) {
      let diff = input[i + 1] - input[i]
      if(diff === 1) n1++
      if(diff === 3) n3++
  }

  return n1 * n3
}
const part2 = () => {
  let memo = new Map()
  const distinctArrangements = i => {
    if (i === input.length - 1) return 1
    if (memo.has(i)) {
      return memo.get(i)
    }
    let ans = 0
    for (let j = i + 1; j < input.length; j++) {
      if (input[j] - input[i] <= 3) {
        ans += distinctArrangements(j)
      }
    }
    memo.set(i, ans)
    return ans
  }
  
  return distinctArrangements(0)
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