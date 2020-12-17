import { importFile } from '../../utils/index.mjs'

const day = '01'
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\n').map(x => parseInt(x, 10))


console.clear()

const part1 = () => {
  for(let i = 0; i < input.length - 1; i++) {
    for(let j = i + 1; j < input.length; j++) {
      if(input[i] + input[j] === 2020) {
        return input[i] * input[j]
      }
    }
  }
}

const part2 = () => {
  for(let i = 0; i < input.length - 2; i++) {
    for(let j = i + 1; j < input.length - 1; j++) {
      for(let k = i + 2; k < input.length; k++) {
        if(input[i] + input[j] + input[k] === 2020) {
          return input[i] * input[j] * input[k]
        }
      }
    }
  }
}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')
