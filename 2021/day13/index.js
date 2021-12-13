import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`
let [input, folds] = importFile(dir, filename).split('\r\n\r\n').map(x => x.split('\r\n'))
input = input.map(x => {
  const pos = x.split(',').map(Number)
  return {x: pos[0], y: pos[1]}
})
folds = folds.map(x => {
  x = x.replace('fold along', '').trim().split('=')
  return {axis: x[0], line: parseInt(x[1])}
})

// generate map
let paper = new Map()
input.forEach(pos => {
  paper.set(`${pos.x},${pos.y}`, pos)
})

const drawGrid = (g) => {
  const existingValues = g.values()
  let xs = []
  let ys = []
  for (const v of existingValues) {
    xs.push(v.x)
    ys.push(v.y)
  }

  xs = xs.sort((a, b) => a - b)
  ys = ys.sort((a, b) => a - b)
  
  const minX = xs[0]
  const minY = ys[0]
  const maxX = xs[xs.length - 1]
  const maxY = ys[ys.length - 1]

  let str = ''
  for (let row = minY; row <= maxY; row++) {
    for (let col = minX; col <= maxX; col++) {
      if (g.has(`${col},${row}`)) {
        str += '#'
      } else {
        str += '.'
      }
    }
    str += '\n'
  }
  console.log(str)
}

const fold = (p, {axis, line}) => {
  if (axis === 'y') {
    p.forEach((pos, posStr) => {
      if (pos.y > line) {
        // find new pos
        const newY = line - (pos.y - line)
        p.set(`${pos.x},${newY}`, {x: pos.x, y: newY})
        p.delete(posStr)
      }
    })
  } else if (axis === 'x') {
    p.forEach((pos, posStr) => {
      if (pos.x > line) {
        // find new pos
        const newX = line - (pos.x - line)
        p.set(`${newX},${pos.y}`, {x: newX, y: pos.y})
        p.delete(posStr)
      }
    })
  }
  
  return p
}

const part1 = () => {
  const a = fold(paper, folds[0])
  return a.size
}

const part2 = () => {
  let a = new Map()
  for (let oneFold of folds) {
    a = new Map(fold(paper, oneFold))
  }
  return a
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
console.log('part2', drawGrid(p2))

updateTimes(p1time, p2time, dir)
updateMainBadge(2021, day, {p1, p2})