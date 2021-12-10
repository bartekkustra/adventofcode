import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\r\n')

const matchClosing = new Map()
matchClosing.set('<', '>')
matchClosing.set('(', ')')
matchClosing.set('[', ']')
matchClosing.set('{', '}')

const v1 = new Map()
v1.set(')', 3)
v1.set(']', 57)
v1.set('}', 1197)
v1.set('>', 25137)

const v2 = new Map()
v2.set(')', 1)
v2.set(']', 2)
v2.set('}', 3)
v2.set('>', 4)

const part1 = () => {
  let sum = 0
  let incompleteLines = []

  for(const line of input) {
    const lineLength = line.length
    const stack = []
    let isCorrupted = false
    for(let pos = 0; pos < lineLength; pos++) {
      const c = line[pos]
      const closing = matchClosing.get(c) || null
      if (closing) {
        stack.unshift(closing)
      } else {
        if(c === stack[0]) {
          stack.shift()
        } else {
          sum += v1.get(c)
          isCorrupted = true
          break
        }
      }
    }
    !isCorrupted && incompleteLines.push(stack)
  }

  return {sum, incompleteLines}
}

const part2 = (lines) => {
  let allScores = []
  for(const line of lines) {
    let completionScore = 0
    for(let c of line) {
      completionScore = (completionScore * 5) + v2.get(c)
    }
    allScores.push(completionScore)
  }

  const sorted = allScores.sort((a, b) => a - b)
  const midPos = Math.floor(sorted.length / 2)

  return sorted[midPos]
}

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p2start = performance.now()
const p2 = part2(p1.incompleteLines)
const p2end = performance.now()

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1.sum)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(2021, day, {p1, p2})