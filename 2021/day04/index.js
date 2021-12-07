import { performance } from 'perf_hooks'
import { importFile, updateTimes } from '../../utils/index.mjs'

console.clear()

const BOARD_SIZE = 5

const day = '04'
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\r\n\r\n')

const drawnNumbers = input[0].split(',').map(Number)
const boards = input
  .slice(1)
  .map(x => 
    x
      .replace(/  +/g, ' ')
      .split('\r\n')
      .map(y =>
        y
          .trim()
          .split(' ')
          .map(Number)))

let boardsMap = new Map()
let valuesMap = new Map()
boards.map((board, index) => {
  let singleBoard = new Map()
  let singleValue = new Map()
  
  board.map((row, rowIdx) => {
    row.map((col, colIdx) => {
      const pos = `${rowIdx},${colIdx}`
      singleBoard.set(pos, {
        number: board[rowIdx][colIdx],
        isChecked: false
      })
      singleValue.set(board[rowIdx][colIdx], pos)
    })
  })
  boardsMap.set(index, singleBoard)
  valuesMap.set(index, singleValue)
})

const generatePosCheck = (pos) => {
  pos = pos.split(',').map(Number)
  // rowcheck
  let checkRow = []
  for(let i = 0; i < BOARD_SIZE; i++) {
    const newpos = `${pos[0]},${i}`
    checkRow.push(newpos)
  }
  // colcheck
  let checkCol = []
  for(let i = 0; i < BOARD_SIZE; i++) {
    const newpos = `${i},${pos[1]}`
    checkCol.push(newpos)
  }
  return {checkRow, checkCol}
}

const part1 = () => {
  let shouldPlay = true
  let winningBoard;
  let winningNumber;
  for(let round = 0; round < drawnNumbers.length && shouldPlay; round++) {
    for(let boardId = 0; boardId < valuesMap.size && shouldPlay; boardId++) {
      const number = drawnNumbers[round]
      const value = valuesMap.get(boardId)

      const pos = value.get(number)

      if(pos) {
        const v = boardsMap.get(boardId).get(pos)
        v.isChecked = true
        boardsMap.get(boardId).set(pos, v)
      
        // check if lines are made
        const posCheck = generatePosCheck(pos)
        const rowCheck = posCheck.checkRow.every(x => boardsMap.get(boardId).get(x).isChecked)
        const colCheck = posCheck.checkCol.every(x => boardsMap.get(boardId).get(x).isChecked)
        if (rowCheck || colCheck) {
          shouldPlay = false
          winningBoard = boardId
          winningNumber = number
        }
      }
    }
  }

  let sumOfUnmarked = 0
  boardsMap.get(winningBoard).forEach(pos => {
    if (!pos.isChecked) sumOfUnmarked += pos.number
  })

  return sumOfUnmarked * winningNumber
}

const part2 = () => {
  let shouldPlay = true
  let boardsWon = new Set()
  let winningBoard;
  let winningNumber;
  for(let round = 0; round < drawnNumbers.length && shouldPlay; round++) {
    for(let boardId = 0; boardId < valuesMap.size && shouldPlay; boardId++) {
      const number = drawnNumbers[round]
      const value = valuesMap.get(boardId)

      const pos = value.get(number)

      if(pos) {
        const v = boardsMap.get(boardId).get(pos)
        v.isChecked = true
        boardsMap.get(boardId).set(pos, v)
      
        // check if lines are made
        const posCheck = generatePosCheck(pos)
        const rowCheck = posCheck.checkRow.every(x => boardsMap.get(boardId).get(x).isChecked)
        const colCheck = posCheck.checkCol.every(x => boardsMap.get(boardId).get(x).isChecked)
        if (rowCheck || colCheck) {
          boardsWon.add(boardId)
          if (boardsWon.size === boardsMap.size) {
            winningBoard = boardId
            winningNumber = number
            shouldPlay = false
          }
        }
      }
    }
  }

  let sumOfUnmarked = 0
  boardsMap.get(winningBoard).forEach(pos => {
    if (!pos.isChecked) sumOfUnmarked += pos.number
  })

  return sumOfUnmarked * winningNumber
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