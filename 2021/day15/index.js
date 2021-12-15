import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename).split('\n').map(x => x.split('').map(Number))

let theMap = new Map()
const maxRow = input.length
const maxCol = input[0].length
for (let row = 0; row < maxRow; row++) {
  for (let col = 0; col < maxCol; col++) {
    const pos = `${col},${row}`
    theMap.set(pos, input[row][col])
  }
}

class Graph {
  #nodes

  constructor() {
    this.#nodes = {}
  }

  addNode(node) {
    this.#nodes[node] = []
  }

  addEdge(source, destination) {
    if (!this.#nodes[source] || !this.#nodes[destination]) return false
    if (!this.#nodes[source].includes(destination)) {
      this.#nodes[source].push(destination)
    }

    if (!this.#nodes[destination].includes(source)) {
      this.#nodes[destination].push(source)
    }
  }

  showNodes() {
    console.log(this.#nodes)
  }

  search(source, visited = new Set(['0,0']), risk = 0) {
    let queue = [{pos: source, visited}]

  }
}

let g = new Graph()
// add all nodes
theMap.forEach((value, pos) => g.addNode(pos))
// add edges
theMap.forEach((value, pos) => {
  const [x,y] = pos.split(',').map(Number)
  const vectors = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  for (let vec of vectors) {
    const newPos = {
      x: x + vec[0],
      y: y + vec[1],
    }
    if (newPos.x > 0 && newPos.x < maxCol && newPos.y > 0 && newPos.y < maxRow) {
      g.addEdge(pos, `${newPos.x},${newPos.y}`)
    }
  }
})


const part1 = () => {
  return g.search()
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

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

// updateTimes(p1time, p2time, dir)
// updateMainBadge(2021, day, {p1, p2})