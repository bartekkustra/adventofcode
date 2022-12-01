import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const year = 2015
const day = getDay(import.meta.url)
const dir = `${year}/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('')

const part1 = () => {
  let floor = 0
  input.forEach((el, index) => {
    el === '('
      ? floor++
      : floor--
    
    if(floor === -1) console.log('FIRST TIME', index + 1)
  })
  return floor
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
updateMainBadge(year, day, {p1, p2})