import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\n').map(x => {
  let dir = []
  // e, w, ne, nw, se, sw
  for (let i = 0; i < x.length; i++) {
    let vector = {dir: '', x: 0, y: 0}
    if (x[i] === 'e') {
      vector.x++
      vector.dir = 'e'
    }
    if (x[i] === 'w') {
      vector.x--
      vector.dir = 'w'
    }
    if (x[i] === 'n' && x[i+1] === 'e') {
      vector.x++
      vector.y--
      vector.dir = 'ne'
      i++
    }
    if (x[i] === 'n' && x[i+1] === 'w') {
      vector.y--
      vector.dir = 'nw'
      i++
    }
    if (x[i] === 's' && x[i+1] === 'e') {
      vector.y++
      vector.dir = 'se'
      i++
    }
    if (x[i] === 's' && x[i+1] === 'w') {
      vector.x--
      vector.y++
      vector.dir = 'sw'
      i++
    }
    dir.push(vector)
  }
  return dir
})

let flippedTiles = new Map() /* xy => bool */

const calculateVector = (steps /* :string[] */) => {
  let vector = {x: 0, y: 0}
  steps.map(step => {
    vector.x = vector.x + step.x
    vector.y = vector.y + step.y
  })
  return vector
}

const convertVectorToPos = (vector) => {
  return `${vector.x},${vector.y}`
}

const convertPosToVector = (pos) => {
  const [x,y] = pos.split(',').map(str => parseInt(str, 10))
  return {x,y}
}

const getTile = (theMap, vector) => {
  const pos = convertVectorToPos(vector)
  if(theMap.has(pos)) {
    return theMap.get(pos)
  }
}

const flipTile = (pos) => {
  if(flippedTiles.has(pos)) {
    flippedTiles.delete(pos)
  } else {
    flippedTiles.set(pos, true)
  }
}

const part1 = () => {
  input.forEach(line => {
    const posAsVector = calculateVector(line)
    const posAsString = convertVectorToPos(posAsVector)
    flipTile(posAsString)
  })
  return flippedTiles.size
}

const part2 = () => {
  const positionsVectors = [
    {x: 0, y: -1},
    {x: 1, y: -1},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 1},
    {x: -1, y: 0},
  ]
  const calculateFlippedNeighbours = (pos) => {
    const vector = convertPosToVector(pos);

    let countBlack = 0;

    positionsVectors.forEach(posvec => {
      const tempVector = {...vector}
      tempVector.x = tempVector.x + posvec.x
      tempVector.y = tempVector.y + posvec.y

      const tile = getTile(flippedTiles, tempVector)
      if (tile) countBlack++;
    })
    return countBlack;
  }
  
  for(let day = 1; day <= 100; day++) {
    let newDayTiles = new Map(flippedTiles);
    let tempTodayTiles = new Map(flippedTiles);

    flippedTiles.forEach((value, key) => {
      const vector = convertPosToVector(key);

      let countBlack = 0;

      positionsVectors.forEach(posvec => {
        const tempVector = {...vector}
        tempVector.x = tempVector.x + posvec.x
        tempVector.y = tempVector.y + posvec.y

        const tempPos = convertVectorToPos(tempVector)
        if (!tempTodayTiles.has(tempPos)) {
          tempTodayTiles.set(tempPos, false)
        }
      })
    })

    tempTodayTiles.forEach((value, key) => {
      const blackTiles = calculateFlippedNeighbours(key)
      if (value) { // black tile

        if (blackTiles === 0 || blackTiles > 2) {
          newDayTiles.set(key, false)
        }
      } else { // white tile
        if (blackTiles === 2) {
          newDayTiles.set(key, true)
        }
      }
    })

    let blackTiles = new Map()
    newDayTiles.forEach((value, key) => {
      if (value) {
        blackTiles.set(key, value)
      }
    })

    flippedTiles = new Map(blackTiles)
  }
  return flippedTiles.size
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
updateMainBadge(2020, day, {p1, p2})