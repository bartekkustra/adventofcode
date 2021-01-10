import { importFile } from '../../utils/index.mjs'

const day = '01'
const dir = `2015/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('')

console.clear()

const part1 = () => {
  let floor = 0
  input.forEach((el, index) => {
    el === '('
      ? floor++
      : floor--
    
    if(floor === -1) console.log('FIRST TIME', index + 1)
  })
  return floor
}

const p1 = part1()
console.log(p1)