import { importFile } from '../../utils/index.mjs'

const day = '02'
const dir = `2015/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n')
  .map(x => x.split('x'))

console.clear()

const part1 = () => {
  let total = 0
  input.forEach(present => {
    const [l, w, h] = present
    const lw = l * w
    const lh = l * h
    const wh = w * h
    const minSize = [lw, lh, wh].sort((a, b) => a - b)[0]
    const paperNeeded = 2*lw + 2*wh + 2*lh + minSize
    total += paperNeeded
  })
  return total
}

const part2 = () => {
  let total = 0
  input.forEach(present => {
    const [l, w, h] = present
    const [minOne, minTwo] = present.sort((a, b) => a - b)
    const ribbonNeeded = 2*minOne + 2*minTwo + (l*w*h)
    total += ribbonNeeded
  })
  return total
}

const p1 = part1()
console.log(p1)
const p2 = part2()
console.log(p2)