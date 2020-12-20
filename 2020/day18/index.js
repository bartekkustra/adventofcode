import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '18'
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n')

const solve = (line) => {
  let tokens = line.split(' ')
  while(tokens.length > 1) {
    const result = eval(tokens.slice(0, 3).join(''))
    tokens = [result].concat(tokens.slice(3))
  }
  return tokens[0]
}

const solveParenthesis = (line) => {
  while(/\(/.test(line)) {
    line = line.replace(/\(([^()]+)\)/g, (match, equation) => {
      return solve(equation)
    })
  }
  return solve(line)
}


const part1 = () => {
  let sum = 0
  input.forEach(element => {
    if (element.indexOf('(') > -1) {
      sum += solveParenthesis(element)
    } else {
      sum += solve(element)
    }
  });

  return sum
}
const part2 = () => {}

console.time('part1')
console.log('  expecting 71, 51, 26, 437, 12240, 13632')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')