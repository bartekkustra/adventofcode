import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\r\n').map(x => {
  let [move, value] = x.split(' ')
  value = parseInt(value, 10)
  return [move, value]
})


const part1 = () => {
  let pos = {
    depth: 0,
    x: 0,
  }

  input.forEach(move => {
    switch(move[0]) {
      case 'forward':
        pos.x += move[1]
        break
      case 'down':
        pos.depth += move[1]
        break
      case 'up':
        pos.depth -= move[1]
        break
      default:
        throw new Error('Incorrect move:', move)
    }
  })
  return pos.depth * pos.x
}

const part2 = () => {
  let pos = {
    depth: 0,
    x: 0,
    aim: 0,
  }

  input.forEach(move => {
    switch(move[0]) {
      case 'forward':
        pos.x += move[1]
        pos.depth += move[1] * pos.aim
        break
      case 'down':
        pos.aim += move[1]
        break
      case 'up':
        pos.aim -= move[1]
        break
      default:
        throw new Error('Incorrect move:', move)
    }
  })
  return pos.depth * pos.x
}

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p2start = performance.now()
const p2 = part2()
const p2end = performance.now()

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
if (p1 !== 0) updateMainBadge(2021, day, 'p1')
if (p2 !== 0) updateMainBadge(2021, day, 'p2')