import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '24'
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
  } else {
    return undefined;
  }
}

const part1 = () => {
  const flipTile = (pos) => {
    if(flippedTiles.has(pos)) {
      const current = flippedTiles.get(pos)
      flippedTiles.set(pos, !current)
    } else {
      flippedTiles.set(pos, true)
    }
  }
  
  const calculateFlippedTiles = () => {
    let blackTiles = 0
    const res = flippedTiles.forEach(tile => {
      tile ? blackTiles++ : null
    })
    return blackTiles
  }

  input.forEach((line, index) => {
    const posAsVector = calculateVector(line)
    const posAsString = convertVectorToPos(posAsVector)
    flipTile(posAsString)
  })
  const blackTiles = calculateFlippedTiles()
  return blackTiles
}
const part2 = () => {
  const calculateFlippedNeighbours = (pos) => {
    const vector = convertPosToVector(pos);

    let countBlack = 0;
    let positionsVectors = [
      {x: 0, y: -1},
      {x: 1, y: -1},
      {x: 1, y: 0},
      {x: 0, y: 1},
      {x: -1, y: 1},
      {x: -1, y: 0},
    ]

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
      let positionsVectors = [
        {x: 0, y: -1},
        {x: 1, y: -1},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: -1, y: 1},
        {x: -1, y: 0},
      ]

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
    flippedTiles = new Map(tempTodayTiles)

    flippedTiles.forEach((value, key) => {
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

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')
console.log('------')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')