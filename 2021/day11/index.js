import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\r\n').map(x => x.split('').map(Number))
let gridInput = new Map()
for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[0].length; col++) {
    const pos = `${col},${row}`
    gridInput.set(pos, input[row][col])
  }
}

const bounds = {
  row: input.length - 1,
  col: input[0].length - 1,
}

const isInBounds = (col, row) => col >= 0 && col <= bounds.col && row >= 0 && row <= bounds.row

const vectors = [
  [-1,-1], [0,-1], [1,-1],
  [-1, 0],         [1, 0],
  [-1, 1], [0, 1], [1, 1],
]

const printGrid = (g) => {
  let row = 0
  let s = ''
  g.forEach((e, p) => {
    const [x,y] = p.split(',')
    if (y != row) {
      s += '\n'
      row++
    }
    s += `${e},`
  })
  console.table(s)
}

const part1 = (grid) => {
  let flashCounter = 0
  const flash = (shouldFlash, didFlash) => {
    if (shouldFlash.size === 0) return
    for (let pos of shouldFlash) {
      const [col, row] = pos.split(',').map(Number)
      if (didFlash.has(pos)) continue
      // let's flash
      flashCounter++
      for (let vec of vectors) {
        const newPos = {
          col: col + vec[0],
          row: row + vec[1],
        }
        if (!isInBounds(newPos.col, newPos.row)) continue
        const newPosStr = `${newPos.col},${newPos.row}`
        if (didFlash.has(newPosStr)) continue
        const energy = grid.get(newPosStr) + 1
        grid.set(newPosStr, energy)
        if (energy > 9) shouldFlash.add(newPosStr)
      }
      shouldFlash.delete(pos)
      didFlash.add(pos)
    }

    if (shouldFlash.size > 0) flash(shouldFlash, didFlash)
    return
  }

  const NUMBER_OF_STEPS = 100
  for(let i = 1; i <= NUMBER_OF_STEPS; i++) {
    let shouldFlash = new Set()
    let didFlash = new Set()

    // up everything by 1
    grid.forEach((energy, pos) => {
      const newEnergy = energy + 1
      grid.set(pos, newEnergy)
      if (newEnergy > 9) {
        shouldFlash.add(pos)
      }
    })

    
    // part 2
    flash(shouldFlash, didFlash)
    didFlash.forEach(flashed => {
      grid.set(flashed, 0)
    })
  }
  return flashCounter
}

const part2 = (grid) => {
  let flashCounter = 0
  const flash = (shouldFlash, didFlash) => {
    if (shouldFlash.size === 0) return
    for (let pos of shouldFlash) {
      const [col, row] = pos.split(',').map(Number)
      if (didFlash.has(pos)) continue
      // let's flash
      flashCounter++
      for (let vec of vectors) {
        const newPos = {
          col: col + vec[0],
          row: row + vec[1],
        }
        if (!isInBounds(newPos.col, newPos.row)) continue
        const newPosStr = `${newPos.col},${newPos.row}`
        if (didFlash.has(newPosStr)) continue
        const energy = grid.get(newPosStr) + 1
        grid.set(newPosStr, energy)
        if (energy > 9) shouldFlash.add(newPosStr)
      }
      shouldFlash.delete(pos)
      didFlash.add(pos)
    }

    if (shouldFlash.size > 0) flash(shouldFlash, didFlash)
    return
  }

  let step = 0
  while(true) {
    const currFlashCounter = flashCounter
    let shouldFlash = new Set()
    let didFlash = new Set()

    // up everything by 1
    grid.forEach((energy, pos) => {
      const newEnergy = energy + 1
      grid.set(pos, newEnergy)
      if (newEnergy > 9) {
        shouldFlash.add(pos)
      }
    })
    
    // part 2
    flash(shouldFlash, didFlash)
    didFlash.forEach(flashed => {
      grid.set(flashed, 0)
    })

    step++
    if (flashCounter - currFlashCounter === 100) return step
  }
  return flashCounter
}

const p1start = performance.now()
const p1Input = new Map(gridInput)
const p1 = part1(p1Input)
const p1end = performance.now()

const p2start = performance.now()
const p2Input = new Map(gridInput)
const p2 = part2(p2Input)
const p2end = performance.now()

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(2021, day, {p1, p2})