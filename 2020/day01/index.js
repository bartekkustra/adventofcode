import { importFile } from '../../utils/index.mjs'

const dir = '2020/day01'
const filename = '1.in'
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

console.log('part1', part1())
console.log('part2', part2())
