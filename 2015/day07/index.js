import { performance } from 'perf_hooks'
import { importFile } from '../../utils/index.mjs'

const day = '07'
const dir = `2015/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename)
  .split('\r\n')
  .map(op => {
    const parsed = op.split(' ')
    switch(parsed.length) {
      case 3:
        // value -> wire
        return {
          ops: "TRANSFER",
          to: parsed[2],
          value: parsed[0],
        }
        break
      case 4:
        // NOT wire -> wire
        return {
          ops: "NOT",
          from: parsed[1],
          to: parsed[3],
        }
        break
      case 5:
        // wire operation wire -> wire
        return {
          ops: "CALC",
          bitwise: parsed[1],
          left: parsed[0],
          right: parsed[2],
          to: parsed[4],
        }
        break
      default:
        throw new Error('Strange case I guess', parsed)
    }
  })

console.clear()
console.log(input)

const part1 = () => {
 
  return 0
}

const part2 = () => {
 
  return 0
}

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p2start = performance.now()
const p2 = part2()
const p2end = performance.now()

console.log(`part1: ${(p1end - p1start).toFixed(3)}ms`)
console.log('part1', p1)
console.log(`part2: ${(p2end - p2start).toFixed(3)}ms`)
console.log('part2', p2)