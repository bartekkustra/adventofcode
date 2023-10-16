import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n')

const map = new Map()
let start = ''
let end = ''
const ROWS = input.length
const COLS = input[0].length

const pos = (x,y) => `${x},${y}`

const heuristic = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y, a.y)

const isBetween = (num, min, max) => num >= min && num <= max

class Point {
  constructor(x, y, value) {
    this.x = x
    this.y = y
    this.value = value
    this.neighbours = []
    this.f = 0 // total cost function
    this.g = 0 // cost function from start to the current grid point
    this.h = 0 // heuristic est cost function from current grid point to the end
    this.parent = undefined
  }

  updateNeighbours() {
    const row = this.x
    const col = this.y
    if (row < ROWS - 1) {
      const newPos = pos(row+1, col)
      if (isBetween(map.get(newPos).value, this.value - 1, this.value + 1)) this.neighbours.push(map.get(newPos))
    }
    if (row > 0) {
      const newPos = pos(row-1, col)
      if (isBetween(map.get(newPos).value, this.value - 1, this.value + 1)) this.neighbours.push(map.get(newPos))
    }
    if (col < COLS - 1) {
      const newPos = pos(row, col + 1)
      if (isBetween(map.get(newPos).value, this.value - 1, this.value + 1)) this.neighbours.push(map.get(newPos))
    }
    if (col > 0) {
      const newPos = pos(row, col - 1)
      if (isBetween(map.get(newPos).value, this.value - 1, this.value + 1)) this.neighbours.push(map.get(newPos))
    }
  }
}

for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    let value = input[row][col].charCodeAt(0) - 96
    const currentPos = pos(row, col)
    if (value === -13 /* S */) {
      start = currentPos
      value = 0
    }
    if (value === -27 /* E */) {
      end = currentPos
      value = 27
    }
    map.set(currentPos, new Point(row, col, value))
  }
}

map.forEach(el => el.updateNeighbours())
start = map.get(start)
end = map.get(end)

const part1 = () => {
  let path = new Set()
  const openSet = []
  const closedSet = []
  // console.log(map)
  // console.log({start, end})
  // for (const line of input) console.log(line)
  openSet.push(start)

  while (openSet.length > 0) {
    let lowestIndex = 0
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i
      }
    }
    let current = openSet[lowestIndex]

    if (current.value === 27 /* END */) {
      let temp = current
      path.add(pos(temp.x, temp.y))
      while (temp.parent) {
        path.add(pos(temp.x, temp.y))
        temp = temp.parent
      }
      return path.size
    }

    openSet.splice(lowestIndex, 1)
    closedSet.push(current)

    let neighbours = current.neighbours

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i]
      
      if (!closedSet.includes(neighbour)) {
        let possibleG = current.g + 1

        if (!openSet.includes(neighbour)) {
          openSet.push(neighbour)
        } else if (possibleG >= neighbour.g) {
          continue
        }

        neighbour.g = possibleG
        neighbour.h = heuristic(neighbour, end)
        neighbour.f = neighbour.g + neighbour.h
        neighbour.parent = current
      }
    }
  }
  return []
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

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(2022, day, {p1, p2})