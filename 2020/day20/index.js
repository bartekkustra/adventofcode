import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '20'
const dir = `2020/day${day}`
const filename = `${day}.sample`
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
  console.log(tilesArr[0])
  
}

const part2 = () => {}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')