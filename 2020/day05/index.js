import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '05'
const dir = `2020/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n')

let seats = new Array(0, 127)
console.log(seats)


const part1 = () => {
  input.forEach(boardingPass => {
    
  })

  return '\n'
}
const part2 = () => {}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')