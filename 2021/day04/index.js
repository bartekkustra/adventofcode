import { performance } from 'perf_hooks'
import { importFile } from '../../utils/index.mjs'

const day = '04'
const dir = `2021/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename).split('\r\n')

console.clear()

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

console.log(`part1: ${(p1end - p1start).toFixed(3)}ms`)
console.log('part1', p1)
console.log(`part2: ${(p2end - p2start).toFixed(3)}ms`)
console.log('part2', p2)