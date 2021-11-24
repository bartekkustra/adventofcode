import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '25'
const dir = `2020/day${day}`
const filename = `${day}.in`
let [card, door] = importFile(dir, filename).replace(/\r/g, '').split('\n').map(Number)

const SUBJECT = 7
const part1 = () => {
  // Python is so much faster... :|
  const transform = (x, z) => {
    return Math.pow(x, z) % 20201227
  }

  let cardLoopSize = 1
  while(transform(SUBJECT, cardLoopSize) != card) {
    cardLoopSize++
  }

  let doorLoopSize = 1
  while(transform(SUBJECT, doorLoopSize) != door) {
    doorLoopSize++
  }

  return {cardLoopSize, doorLoopSize}
}

console.time('part1')
const p1 = part1()
console.timeEnd('part1')

console.log(p1)