import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n')
  .map(x => {
    const [direction, distance] = x.split(' ')
    return {
      direction, 
      distance: Number(distance),
    }
  })

const moveHead = ({pos, move}) => {
  switch(move.direction) {
    case 'R':
      pos.x += 1
      break
    case 'L':
      pos.x -= 1
      break
    case 'U':
      pos.y += 1
      break
    case 'D':
      pos.y -= 1
      break
    default:
      throw new Error('Incorrect direction', move)
  }
  return pos
}

const moveTail = (head, tail) => {
  const xDiff = head.x - tail.x
  const yDiff = head.y - tail.y
  const xDiffAbs = Math.abs(xDiff)
  const yDiffAbs = Math.abs(yDiff)

  if (xDiff === 0 || yDiff === 0) {
    if (xDiff === 2) {
      tail.x += 1
    } else if (xDiff === -2) {
      tail.x += -1
    } else if (yDiff === 2) {
      tail.y += 1
    } else if (yDiff === -2) {
      tail.y += -1
    }
  } else if (xDiffAbs === 2 && yDiffAbs === 2) {
    const moveX = xDiff / xDiffAbs
    const moveY = yDiff / yDiffAbs
    tail.x += moveX
    tail.y += moveY
  } else if (xDiffAbs === 2 || yDiffAbs === 2) {
    tail.x = head.x
    tail.y = head.y
    if (xDiff === 2) {
      tail.x = tail.x - 1
    } else if (xDiff === -2) {
      tail.x = tail.x + 1
    } else if (yDiff === 2) {
      tail.y = tail.y - 1
    } else if (yDiff === -2) {
      tail.y = tail.y + 1
    }
  }
  
  return tail
}

const knots1 = new Map()
const knots2 = new Map()

for (let i = 1; i <= 9; i++) {
  knots1.set(i, {x: 0, y: 0})
}
for (let i = 1; i <= 9; i++) {
  knots2.set(i, {x: 0, y: 0})
}

const knotHistory1 = new Set()
const knotHistory2 = new Set()

const part1 = () => {
  let headPos = {x: 0, y: 0}
  let historyOfKnot = 1
  let numberOfKnots = 2
  for (const move of input) {
    for (let dist = 1; dist <= move.distance; dist++) {
      headPos = moveHead({pos: headPos, move})
      for (let key = 1; key < numberOfKnots; key++) {
        let currentTail = knots1.get(key)
        const currentHead = key === 1 ? headPos : knots1.get(key - 1)
        currentTail = moveTail(currentHead, currentTail)
        knots1.set(key, currentTail)
        if (key === historyOfKnot) {
          knotHistory1.add(`${currentTail.x},${currentTail.y}`)
        }
      }
    }
  }
  return knotHistory1.size
}


const part2 = () => {
  let headPos = {x: 0, y: 0}
  let historyOfKnot = 9
  let numberOfKnots = 10
  for (const move of input) {
    for (let dist = 1; dist <= move.distance; dist++) {
      headPos = moveHead({pos: headPos, move})
      for (let key = 1; key < numberOfKnots; key++) {
        let currentTail = knots2.get(key)
        const currentHead = key === 1 ? headPos : knots2.get(key - 1)
        currentTail = moveTail(currentHead, currentTail)
        knots2.set(key, currentTail)
        if (key === historyOfKnot) {
          knotHistory2.add(`${currentTail.x},${currentTail.y}`)
        }
      }
    }
  }
  return knotHistory2.size
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
updateMainBadge(2022, day, {p1, p2})