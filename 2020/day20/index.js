import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()
console.log('-'.repeat(20))

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.sample`

/*
~1. parse the input to separate each tile and its id
2. for each tile, calculate all of its possible edges (byu rotating and flipping)
3. for each tile, find its neighbour (tiles that can fir next to it) by comparing edges
4. assemble the tiles by starting with an arbitrary corner and placing tiles next to it using the neighour information
5. once the image is assembled, identify the four corner files and multiply their ids together
*/

let input = importFile(dir, filename).replace(/\r/g, '').split('\n\n').map(x => {
  const [id, ...data] = x.split('\n')
  return {
    id: Number(id.match(/\d+/)[0]),
    data
  }
})

const reverseEdge = (edge) => edge.split('').reverse().join('')

const parseTiles = (tile) => {
  const top = tile.data[0]
  const bottom = tile.data[tile.data.length - 1]
  const left = tile.data.map(row => row[0]).join('')
  const right = tile.data.map(row => row[row.length - 1]).join('')
  return [top, bottom, left, right, reverseEdge(top), reverseEdge(bottom), reverseEdge(left), reverseEdge(right)]
}

const findNeighbours = (tile, tiles) => {
  const tileEdges = parseTiles(tile)
  const neighbours = []
  for (const otherTile of tiles) {
    if (tile.id === otherTile.id) continue
    const otherEdges = parseTiles(otherTile)
    for (const edge of tileEdges) {
      if (otherEdges.includes(edge)) {
        neighbours.push(otherTile.id)
        break
      }
    }
  }
  return neighbours
}

const findCornerTiles = (tiles) => tiles.filter(tile => findNeighbours(tile, tiles).length === 2).map(tile => tile.id)

const part1 = () => {
  const cornerTiles = findCornerTiles(input)
  return cornerTiles.reduce((a, b) => a * b, 1)
}

const part2 = () => {}

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

// updateTimes(p1time, p2time, dir)
// updateMainBadge(2020, day, {p1, p2})