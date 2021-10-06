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

// const part1b = () => {
//   // input.sort((a, b) => a - b)
//   let left = 0
//   let right = input.length - 1
//   while(true) {
//     const iLeft = input[left]
//     const iRight = input[right]
//     const sum = iLeft + iRight
//     if(sum === 2020) return iLeft * iRight
//     if(sum < 2020) left++
//     if(sum > 2020) right--
//     if(left > right) return false
//   }
//   return false
// }

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

// console.time('part1b')
// console.log('part1b:', part1b())
// console.timeEnd('part1b')

// console.time('part2')
// console.log('part2:', part2())
// console.timeEnd('part2')
