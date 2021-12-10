import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\r\n')

const open = ['<', '(', '[', '{']
const close = ['>', ')', ']', '}']

const part1 = () => {
  const values = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }
  let closings = []
  let incompleteLines = []
  
  input.forEach(line => {
    // debugger
    const stack = []
    let pos = 0
    let isCorrupted = false
    while(pos < line.length) {
      const c = line[pos]
      if(open.includes(c)) {
        stack.push(c)
        pos++
      } else {
        const charPos = close.findIndex(x => x === c)
        if (stack[stack.length - 1] === open[charPos]) {
          stack.pop()
          pos++
        } else {
          closings.push(line[pos])
          isCorrupted = true
          break
        }
      }
    }
    !isCorrupted && incompleteLines.push(stack)
  })

  let sum = 0
  closings.forEach(el => {
    sum += values[el]
  })
  
  return {sum, incompleteLines}
}

const part2 = (lines) => {
  const values = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }
  let allScores = []
  lines.forEach(line => {
    let completionScore = 0
    const newLine = [...line].reverse()
    for (let x of newLine) {
      const charPos = open.findIndex(y => y === x)
      completionScore = (completionScore * 5) + values[close[charPos]]
    }
    allScores.push(completionScore)
  })

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