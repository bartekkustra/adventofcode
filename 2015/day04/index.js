import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'
import md5 from 'md5'

console.clear()

const year = 2015
const day = getDay(import.meta.url)
const dir = `${year}/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename).replace(/\r/g, '')

const part1 = () => {
  let i = 0;
  while(true) {
    const md5value = md5(`${input}${i}`)
    if(md5value.startsWith('00000')) {
      break;
    }
    i++
  }
  
  return i
}

const part2 = () => {
  let i = 0;
  while(true) {
    const md5value = md5(`${input}${i}`)
    if(md5value.startsWith('000000')) {
      break;
    }
    i++
  }

  return i
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