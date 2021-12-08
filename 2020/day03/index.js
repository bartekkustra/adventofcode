import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\r\n')

const multiSteps = [
  { stepRight: 1, stepDown: 1, },
  { stepRight: 3, stepDown: 1, },
  { stepRight: 5, stepDown: 1, },
  { stepRight: 7, stepDown: 1, },
  { stepRight: 1, stepDown: 2, },
]

const walkAndCountTreesByModulo = (map, steps) => {
  let countTrees = 0
  let row = 0
  let col = 0
  while(row < map.length) {
    if(map[row][col] === '#') countTrees++
    row += steps.stepDown
    col = (col + steps.stepRight) % map[0].length
  }
  return countTrees
}

const part1 = () => walkAndCountTreesByModulo(input, multiSteps[1])
const part2 = () => multiSteps
  .reduce((prev, curr) => prev *= walkAndCountTreesByModulo(input, curr), 1)

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