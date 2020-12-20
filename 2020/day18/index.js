import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '18'
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

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')