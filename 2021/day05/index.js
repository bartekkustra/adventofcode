import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`

let stepsPartOne = []
let stepsPartTwo = []
let input = importFile(dir, filename).split('\r\n').map(x => {
  const coords = x.match('([0-9]{1,},[0-9]{1,}) -> ([0-9]{1,},[0-9]{1,})')
  const [fromStr, toStr] = [coords[1], coords[2]]
  let fromArr = fromStr.split(',').map(Number)
  let toArr = toStr.split(',').map(Number)

  if (fromArr[0] === toArr[0] || fromArr[1] === toArr[1]) {
    stepsPartOne.push({
      from: {
        col: fromArr[0],
        row: fromArr[1],
      },
      to: {
        col: toArr[0],
        row: toArr[1],
      }
    })
  }
  stepsPartTwo.push({
    from: {
      col: fromArr[0],
      row: fromArr[1],
    },
    to: {
      col: toArr[0],
      row: toArr[1],
    }
  })
})

const runThroughGrid = (g, s) => {
  const {from, to} = s

  const vectorX = (to.col - from.col) / Math.abs(to.col - from.col) || 0
  const vectorY = (to.row - from.row) / Math.abs(to.row - from.row) || 0

  let pos = {
    x: from.col,
    y: from.row
  }
  
  while(true) {
    const posStr = `${pos.x},${pos.y}`
    const curr = g.get(posStr) || 0
    g.set(posStr, curr + 1)

    if (pos.x === to.col && pos.y === to.row) {
      break
    }

    pos.x += vectorX
    pos.y += vectorY
  }

  return g
}

const drawGrid = (g) => {
  const GRID_SIZE = 10
  let log = ''
  for(let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      const pos = `${x},${y}`
      if (g.has(pos)) {
        log += g.get(pos)
      } else {
        log += '.'
      }
    }
    log += '\n'
  }
  console.log(log)
}

const part1 = () => {
  let grid = new Map()
  stepsPartOne.forEach(step => {
    grid = runThroughGrid(grid, step)
  })

  let dangerousAreas = 0
  grid.forEach(el => {
    if (el >= 2) dangerousAreas++
  })
  return dangerousAreas
}

const part2 = () => {
  let grid = new Map()
  stepsPartTwo.forEach(step => {
    grid = runThroughGrid(grid, step)
  })

  let dangerousAreas = 0
  grid.forEach(el => {
    if (el >= 2) dangerousAreas++
  })
  return dangerousAreas
  
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
if (p1 !== 0) updateMainBadge(2021, day, 'p1')
if (p2 !== 0) updateMainBadge(2021, day, 'p2')