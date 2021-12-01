import { importFile } from '../../utils/index.mjs'

const day = '01'
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\n').map(x => parseInt(x, 10))

console.clear()

const part1 = () => {
  let sum = 0
  for(let i = 1; i < input.length; i++) {
    if (input[i-1] < input[i]) sum++
  }
  return sum
}

const part2 = () => {

}

console.time('part1')
const p1 = part1()
console.timeEnd('part1')

console.time('part2')
const p2 = part2()
console.timeEnd('part2')


console.log('part1', p1)
console.log('part2', p2)