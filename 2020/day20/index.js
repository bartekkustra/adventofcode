import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
const tilesMap = new Map();
const tilesArr = []

const reverseString = str => str.split``.reverse().join``

const readEdge = ({tile}) => {
  const result = [tile[0], tile[tile.length - 1], tile.map(x => x[0]).join``, tile.map(x => x[x.length - 1]).join``]
  const reversed = result.map(x => reverseString(x))
  return [...result, ...reversed]
}

let input = importFile(dir, filename).replace(/\r/g, '').split('\n\n').map(x => x.split('\n')).forEach(x => {
  const tileName = parseInt(x.shift().replace(/(Tile|:)/g, '').trim(), 10)
  tilesMap.set(tileName, x)
  const tile = {
    id: tileName,
    tile: x,
  }

  tilesArr.push({
    ...tile,
    edges: readEdge(tile)
  })
})

const part1 = () => {
  
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