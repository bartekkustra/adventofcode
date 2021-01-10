import md5 from 'md5'
import { importFile } from '../../utils/index.mjs'

const day = '04'
const dir = `2015/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
  .replace(/\r/g, '')

console.clear()

const part1 = () => {
  let i = 0;
  while(true) {
    const md5value = md5(`${input}${i}`)
    if(md5value.startsWith('00000')) {
      break;
    }
    i++
  }
  
  return i
}

const part2 = () => {
  let i = 0;
  while(true) {
    const md5value = md5(`${input}${i}`)
    if(md5value.startsWith('000000')) {
      break;
    }
    i++
  }

  return i
}

console.time('part1')
const p1 = part1()
console.timeEnd('part1')
console.log(p1)
// console.time('part2')
// const p2 = part2()
// console.log(p2)
// console.timeEnd('part2')