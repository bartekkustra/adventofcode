import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\n\n').map(x => x.split('\r\n').map(Number))

const part1 = () => {
  let most = {
    index: 0,
    sum: 0,
  }
  for (let i = 0; i < input.length; i++) {
    let sum = input[i].reduce((prev, curr) => prev + curr)
    if (sum > most.sum) {
      most.index = i
      most.sum = sum
    }
  }
  return most
}

const part2 = () => {
  let elfs = []
  for (let i = 0; i < input.length; i++) {
    let sum = input[i].reduce((prev, curr) => prev + curr)
    elfs.push({
      index: i,
      sum
    })
  }
  elfs = elfs.sort((a, b) => b.sum - a.sum).slice(0, 3).reduce(((prev, curr) => prev + curr.sum), 0)
  return elfs
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