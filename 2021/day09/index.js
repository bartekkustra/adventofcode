import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`
const input = importFile(dir, filename).split('\r\n').map(x => x.split('').map(Number))
const width = input[0].length
const height = input.length
const checkPosVectors = [[1,0], [-1,0], [0,1], [0,-1]]

let checkedMap = new Map()
/*
  Map => {
    '1,2': 8
  }
*/

let lowestPoints = new Map()
/*
  Map => [
    '0,1': 1
    '0,9': 0
    '2,2': 5
    '4,6': 5
  ]
*/

const isInBounds = (x,y) => x >= 0 && x < width && y >= 0 && y < height

const part1 = () => {
  for (let row in input) {
    for (let col in input[row]) {
      const currPos = `${col},${row}`
      const currDepth = input[row][col]
      row = parseInt(row)
      col = parseInt(col)
      checkedMap.set(currPos, currDepth)
      let isLowest = true
      for (let i = 0; i < checkPosVectors.length; i++) {
        const newPos = {
          x: col + checkPosVectors[i][0],
          y: row + checkPosVectors[i][1],
        }
        if (isInBounds(newPos.x, newPos.y)) {
          if (input[newPos.y][newPos.x] <= currDepth) {
            isLowest = false
          }
        }
      }

      if (isLowest) {
        lowestPoints.set(currPos, currDepth)
      }
    }
  }
  let riskLevel = 0
  lowestPoints.forEach(x => riskLevel += x + 1)

  return riskLevel
}

let basins = new Map()
let seenBasins = new Set()

const part2 = () => {
  lowestPoints.forEach((depth, basinId) => {
    const floodUp = (posX, posY) => {
      const currPos = `${posX},${posY}`
      if (seenBasins.has(currPos)) return
      seenBasins.add(currPos)
      const depth = input[posY][posX]
      for (let i = 0; i < checkPosVectors.length; i++) {
        const vec = checkPosVectors[i]
        const newPos = {
          x: posX + vec[0],
          y: posY + vec[1],
        }
        if (isInBounds(newPos.x, newPos.y)) {
          const newPosStr = `${newPos.x},${newPos.y}`
          const checkDepth = input[newPos.y][newPos.x]
          if (checkDepth !== 9) {
            const currBasin = basins.get(basinId)
            if (!currBasin.includes(newPosStr)) {
              counter++
              if (!currBasin.includes(newPosStr)) {
                currBasin.push(newPosStr)
                basins.set(basinId, currBasin)
              }
            }
            floodUp(newPos.x, newPos.y)
          }
        }
      }
    }

    let counter = 1
    const [basinX, basinY] = basinId.split(',').map(Number)
    
    basins.set(basinId, [basinId])
    floodUp(basinX, basinY)
  })

  const basinsSize = []
  basins.forEach((arr, basinId) => basinsSize.push([basinId, arr.length]))
  basinsSize.sort((a, b) => b[1] - a[1])
  return basinsSize[0][1] * basinsSize[1][1] * basinsSize[2][1]
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
updateMainBadge(2021, day, {p1, p2})