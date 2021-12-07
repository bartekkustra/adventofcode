import { performance } from 'perf_hooks'
import { importFile, updateTimes } from '../../utils/index.mjs'

console.clear()

const day = '00'
const dir = `2021/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename)

const part1 = () => {
  
  return 0
}

const part2 = () => {
  
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