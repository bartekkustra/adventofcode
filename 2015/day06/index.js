import { performance } from 'perf_hooks'
import { importFile } from '../../utils/index.mjs'

const day = '06'
const dir = `2015/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
  .split('\r\n')
  .map(x => {
    const [all, instruction, from, to] = x
      .match('^(turn on|toggle|turn off) ([0-9]{1,},[0-9]{1,}) through ([0-9]{1,},[0-9]{1,})')
    const [fromX, fromY] = from.split(',').map(Number)
    const [toX, toY] = to.split(',').map(Number)
    return {
      instruction, 
      from: {
        x: fromX,
        y: fromY,
      },
      to: {
        x: toX,
        y: toY,
      }
    }
  })

console.clear()

const runThroughGrid = (grid, inst, from, to) => {
  for (let row = from.x; row <= to.x; row++) {
    for (let col = from.y; col <= to.y; col++) {
      const pos = `${row},${col}`
      switch(inst) {
        case 'turn on':
          grid.add(pos)
          break
        case 'turn off':
          grid.delete(pos)
          break
        case 'toggle':
          grid.has(pos)
            ? grid.delete(pos)
            : grid.add(pos)
          break
        default:
          throw new Error('Incorrect instruction')
      }
    }
  }
  return grid
}

const part1 = () => {
  let grid = new Set()
  /*
    grid = Set(
      x,y,
      x2,y2
    )
  */
  input.forEach(({instruction, from, to}) => {
    grid = runThroughGrid(grid, instruction, from, to)
  })
  return grid.size
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