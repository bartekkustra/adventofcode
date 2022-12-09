import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
let myMap = new Map()
let input = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n')
  .map(x => x
    .split('')
    .map(Number))
const INPUT_ROWS = input.length
const INPUT_COLS = input[0].length
const pos = (a, b) => `${a},${b}`

for (let row = 0; row < INPUT_ROWS; row++) {
  for (let col = 0; col < INPUT_COLS; col++) {
    myMap.set(pos(row, col), input[row][col])
  }
}

const checkTrees = ({row, col, checkRow, checkCol}) => {
  let isVisible = true
  const currentTree = myMap.get(pos(row, col))
  for (let i = row, j = col; (i >= 0 && i < INPUT_ROWS) && (j >= 0 && j < INPUT_COLS); i+=checkRow, j+=checkCol) {
    if (i === row && j === col) continue
    // console.log(i, j, myMap.get(pos(i, j)))
    if (myMap.get(pos(i, j)) >= currentTree) {
      isVisible = false
      break
    }
  }
  return isVisible
}

const checkAllSides = (row, col) => {
  return [
    checkTrees({row, col, checkRow: -1, checkCol: 0}),
    checkTrees({row, col, checkRow: 1, checkCol: 0}),
    checkTrees({row, col, checkRow: 0, checkCol: -1}),
    checkTrees({row, col, checkRow: 0, checkCol: 1}),
  ]
}

const checkAndCountTrees = ({row, col, checkRow, checkCol}) => {
  let countTrees = 0
  const currentTree = myMap.get(pos(row, col))
  for (let i = row, j = col; (i >= 0 && i < INPUT_ROWS) && (j >= 0 && j < INPUT_COLS); i+=checkRow, j+=checkCol) {
    if (i === row && j === col) continue
    countTrees++
    if (myMap.get(pos(i, j)) < currentTree) {
      continue
    } else {
      break
    }
  }
  return countTrees
}

const part1 = () => {
  let visibleTrees = 2*INPUT_ROWS + 2*INPUT_COLS - 4
  const top = checkTrees({row: 2, col: 2, checkRow: -1, checkCol: 0})
  for (let row = 1; row < INPUT_ROWS - 1; row++) {
    for (let col = 1; col < INPUT_COLS - 1; col++) {
      const treeVisible = checkAllSides(row, col).some(x => x === true)
      if (treeVisible) visibleTrees++
    }
  }
  return visibleTrees
}

const part2 = () => {
  let highest = 0
  for (let row = 0; row < INPUT_ROWS; row++) {
    for (let col = 0; col < INPUT_COLS; col++) {
      let sum = 0
      const top = checkAndCountTrees({row, col, checkRow: -1, checkCol: 0})
      const bottom = checkAndCountTrees({row, col, checkRow: 1, checkCol: 0})
      const left = checkAndCountTrees({row, col, checkRow: 0, checkCol: -1})
      const right = checkAndCountTrees({row, col, checkRow: 0, checkCol: 1})
      sum = top * bottom * left * right
      if (sum > highest) highest = sum
    }
  }
  return highest
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