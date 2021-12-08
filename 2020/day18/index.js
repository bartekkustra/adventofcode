import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n')

const solvePart1 = (line) => {
  let tokens = line.split(' ')
  while(tokens.length > 1) {
    const result = eval(tokens.slice(0, 3).join(''))
    tokens = [result].concat(tokens.slice(3))
  }
  return tokens[0]
}

const solvePart2 = (line) => {
  while(/\+/.test(line)) {
    line = line.replace(/(\d+) \+ (\d+)/, (match, a, b) => parseInt(a, 10) + parseInt(b, 10))
  }
  return eval(line)
}

const solveWithParenthesis = (line, solve) => {
  while(/\(/.test(line)) {
    line = line.replace(/\(([^()]+)\)/g, (match, equation) => solve(equation))
  }
  return solve(line)
}


const part1 = () => {
  let sum = 0
  input.forEach(element => {
    if (element.indexOf('(') > -1) {
      sum += solveWithParenthesis(element, solvePart1)
    } else {
      sum += solvePart1(element)
    }
  });
  return sum
}

const part2 = () => {
  let sum = 0
  input.forEach(element => {
    if (element.indexOf('(') > -1) {
      sum += solveWithParenthesis(element, solvePart2)
    } else {
      sum += solvePart2(element)
    }
  });

  return sum
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