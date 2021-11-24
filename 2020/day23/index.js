import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '23'
const dir = `2020/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename).replace(/\r/g, '').split('').map(x => parseInt(x, 10))

console.log(`input:`, input, '\n\n')
const part1 = () => {
  
}
const part2 = () => {}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')