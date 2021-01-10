import { importFile } from '../../utils/index.mjs'

const day = '03'
const dir = `2015/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
  .replace(/\r/g, '').split('')

console.clear()

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

const p1 = part1()
console.log(p1)
const p2 = part2()
console.log(p2)