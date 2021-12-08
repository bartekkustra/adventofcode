import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n')

const sortBySeatId = (a, b) => {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}


const part1 = () => {
  let arr = []
  input.forEach(boardingPass => {
    let row = new Array(0, 127)
    let col = new Array(0, 7)
    for(let i = 0; i < boardingPass.length - 3; i++) {
      const letter = boardingPass[i]
      if(letter === 'F') {
        row[1] = Math.floor(row[1] - (row[1]-row[0]) / 2)
      } else {
        row[0] = Math.ceil(row[0] + ((row[1]-row[0]) / 2))
      }
    }
    for(let i = boardingPass.length - 3; i < boardingPass.length; i++) {
      const letter = boardingPass[i]
      if(letter === 'L') {
        col[1] = Math.floor(col[1] - (col[1]-col[0]) / 2)
      } else {
        col[0] = Math.ceil(col[0] + ((col[1]-col[0]) / 2))
      }
    }
    arr.push(row[0] * 8 + col[0])
  })
  arr.sort(sortBySeatId)

  return arr
}

const part2 = (seatIds) => {
  let result = 0
  seatIds.forEach((seat, index) => {
    if(index !== seatIds.length - 1) {
      if(seatIds[index + 1] - seat !== 1) {
        result = seat + 1
      }
    }
  })
  return result
}

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p2start = performance.now()
const p2 = part2(p1)
const p2end = performance.now()

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1[p1.length - 1])
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(2020, day, {p1, p2})