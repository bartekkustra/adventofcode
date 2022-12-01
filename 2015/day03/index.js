import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const year = 2015
const day = getDay(import.meta.url)
const dir = `${year}/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename).replace(/\r/g, '').split('')

const part1 = () => {
  let housesMap = new Map()
  let pos = [0, 0]
  housesMap.set('0,0', 1)

  input.forEach(dir => {
    switch(dir) {
      case '>':
        pos[0] += 1
        break;
      case '<':
        pos[0] -= 1
        break;
      case '^':
        pos[1] += 1
        break;
      case 'v':
        pos[1] -= 1
        break;
    }
    let newPos = pos.join(',')
    if(housesMap.has(newPos)) {
      const v = housesMap.get(newPos) + 1
      housesMap.set(newPos, v)
    } else {
      housesMap.set(newPos, 1)
    }
  })

  return housesMap.size
}

const part2 = () => {
  let housesMap = new Map()
  let pos = {
    santa: [0,0],
    robot: [0,0],
  }
  housesMap.set('0,0', 2)

  input.forEach((dir, index) => {
    if(index % 2 === 0) {
      switch(dir) {
        case '>':
          pos.santa[0] += 1
          break;
        case '<':
          pos.santa[0] -= 1
          break;
        case '^':
          pos.santa[1] += 1
          break;
        case 'v':
          pos.santa[1] -= 1
          break;
      }
      let newPos = pos.santa.join(',')
      if(housesMap.has(newPos)) {
        const v = housesMap.get(newPos) + 1
        housesMap.set(newPos, v)
      } else {
        housesMap.set(newPos, 1)
      }
    } else {
      switch(dir) {
        case '>':
          pos.robot[0] += 1
          break;
        case '<':
          pos.robot[0] -= 1
          break;
        case '^':
          pos.robot[1] += 1
          break;
        case 'v':
          pos.robot[1] -= 1
          break;
      }
      let newPos = pos.robot.join(',')
      if(housesMap.has(newPos)) {
        const v = housesMap.get(newPos) + 1
        housesMap.set(newPos, v)
      } else {
        housesMap.set(newPos, 1)
      }
    }
  })

  return housesMap.size
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
updateMainBadge(year, day, {p1, p2})