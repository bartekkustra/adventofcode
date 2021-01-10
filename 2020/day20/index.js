import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '20'
const dir = `2020/day${day}`
const filename = `${day}.sample`

let tileMap = new Map()
let input = importFile(dir, filename).replace(/\r/g, '').split('\n\n').forEach(x => {
  x = x.split(':\n')
  const {groups} = x[0].match(/^Tile (?<tileID>\d+)/)
  const tileId = parseInt(groups.tileID, 10)
  const arr = x[1].split('\n')
  tileMap.set(tileId, arr)
})

let tileMatches = new Map()

const edges = ['top', 'right', 'bottom', 'left']
const flipped = [false, true]

/**
 * @name getEdge
 * @description return specific edge of a specific tile
 *
 * @param {number} tileid id of the tile from tileMap
 * @param {string} edge top | left | bottom | right
 */
const getEdge = (tileid, edge) => {
  const tileData = tileMap.get(tileid)

  let edgeString = ''
  switch(edge) {
    case 'top':
      edgeString = tileData[0]
      break;
      
    case 'left':
      for(let i = 0; i < tileData.length; i++) {
        edgeString += tileData[i][0]
      }
      break;
      
    case 'right':
      for(let i = 0; i < tileData.length; i++) {
        edgeString += tileData[i][tileData.length - 1]
      }
      break;
      
    case 'bottom':
      edgeString = tileData[tileData.length - 1]
      break;

    default:
      throw new Error(`Incorrect edge: ${edge}`)
  }
  return edgeString
}

/**
 * @name flipEdge
 * @description flip the edge by reversing the order of characters
 *
 * @param {*} edge
 */
const flipEdge = (edge) => edge.split('').reverse().join('')

/**
 * @name flipArray
 * @description flips array horizontally or vertically
 *
 * @param {Array<>} arr
 * @param {string} how vertically | horizontally
 * @return {Array<>} 
 */
const flipArray = (arr, how) => {
  let newArr = []

  /* horizontally
    [1, 2, 3],          [7, 8, 9]
    [4, 5, 6],    =>    [4, 5, 6]
    [7, 8, 9]           [1, 2, 3]
  */
  if(how === 'horizontally') {
    for(let i = arr.length - 1; i >= 0; i--) {
      newArr.push(arr[i])
    }
    return newArr
  }

  /* vertically
    [1, 2, 3],          [3, 2, 1]
    [4, 5, 6],    =>    [6, 5, 4]
    [7, 8, 9]           [9, 8, 7]
  */
  if(how === 'vertically') {
   for(let i = 0; i < arr.length; i++) {
     newArr.push(arr[i].reverse())
    }
    return newArr
  }
  
  return arr
}

/**
 * @name rotateArray
 * @description Rotate Array X times clockwise
 *
 * @param {Array<>} arr
 * @param {number} rotateTimes how many times array should be rotated clockwise
 * @return {Array<>}
 */
const rotateArray = (arr, rotateTimes) => {
  rotateTimes %= 4
  let newArr = []
  for(let rotation = 0; rotation < rotateTimes; rotation++) {
    for(let col = 0; col < arr[0].length; col++) {
      let newRow = []
      for(let row = arr.length - 1; row >= 0; row--) {
        newRow += arr[row][col]
      }
      newArr.push(newRow)
    }
  }
  return newArr
}

const dupa = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// console.log(flipArray(dupa, 'horizontally'))
// console.log(flipArray(dupa, 'vertically'))
console.log(rotateArray(dupa, 1))

/**
 * @name part1
 * @description Solution to Part 1
 *
 */
const part1 = () => {
  // 2311
  let finalMap = new Array()
  let arrayOfTileIds = [...tileMap.keys()]
  const squareRoot = Math.sqrt(arrayOfTileIds.length)
  const isPerfectSquare = Math.floor(squareRoot) === squareRoot

  console.log(`isPerfectSquare: ${isPerfectSquare}`)
  for(let i = 0; i < arrayOfTileIds.length - 1; i++) {
    for(let j = i+1; j < arrayOfTileIds.length; j++) {
      const tile1 = arrayOfTileIds[i]
      const tile2 = arrayOfTileIds[j]
      // console.log(`  ?? -> ${tile1} & ${tile2}`)
      edges.forEach(tile1edge => {
        edges.forEach(tile2edge => {
          const edge1 = getEdge(tile1, tile1edge)
          const edge2 = getEdge(tile2, tile2edge)
          if(edge1 === edge2) {
            if(tileMatches.has(tile1)) {
              let getTileMatches = tileMatches.get(tile1)
              if(!getTileMatches.includes(tile2)) {
                getTileMatches.push(tile2)
                tileMatches.set(tile1, getTileMatches)
              }
            } else {
              tileMatches.set(tile1, [tile2])
            }
          } else if(edge1 === flipEdge(edge2)) {
            if(tileMatches.has(tile1)) {
              let getTileMatches = tileMatches.get(tile1)
              if(!getTileMatches.includes(tile2)) {
                getTileMatches.push(tile2)
                tileMatches.set(tile1, getTileMatches)
              }
            } else {
              tileMatches.set(tile1, [tile2])
            }
          } else if(flipEdge(edge1) === edge2) {
            if(tileMatches.has(tile1)) {
              let getTileMatches = tileMatches.get(tile1)
              if(!getTileMatches.includes(tile2)) {
                getTileMatches.push(tile2)
                tileMatches.set(tile1, getTileMatches)
              }
            } else {
              tileMatches.set(tile1, [tile2])
            }
          }
        })
      })
    }
  }
  console.log(tileMatches)
}

const part2 = () => {}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')