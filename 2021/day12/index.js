import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.sample`

// read input and find unique nodes
let uniqueNodes = new Set()
let input = importFile(dir, filename).split('\r\n').map(x => {
  const [from, to] = x.split('-')
  uniqueNodes.add(from)
  uniqueNodes.add(to)
  return [from, to]
})

class Graph {
  #nodes

  constructor() {
    this.#nodes = {}
  }

  addNode(node) {
    this.#nodes[node] = []
  }

  addEgde(source, destination) {
    if (!this.#nodes[source] || !this.#nodes[destination]) return false
    
    if (!this.#nodes[source].includes(destination)) {
      this.#nodes[source].push(destination)
    }

    if(!this.#nodes[destination].includes(source)) {
      this.#nodes[destination].push(source)
    }
  }
  
  showNodes() {
    console.log(this.#nodes)
  }

  bfs_search(source, destination) {
    const queue = [source]
    const visited = {}

    while(queue.length) {
      const curr = queue.shift()
      
      // if already visited
      if (visited[curr]) continue
      if (curr === destination) return visited

      const upper = curr.toUpperCase()
      if (curr !== upper) {
        visited[curr] = true
      }

      let neighbours = this.#nodes[curr]
      for (let neighbour of neighbours) {
        queue.push(neighbour)
      }
    }
    return false
  }

  search(source, destination, visited = {}) {
    if (visited[source]) return false
    if (source === destination) return true
    
    if (source !== source.toUpperCase()) {
      visited[source] = true
    }

    const neighbours = this.#nodes[source]
    for (let neighbour of neighbours) {
      if (this.search(neighbour, destination, visited)) {
        return true
      }
    }

    return false
  }
}

let g = new Graph()

// add all nodes
uniqueNodes.forEach(node => {
  g.addNode(node)
})

// add edges
for (let edge of input) {
  g.addEgde(edge[0], edge[1])
}

const part1 = () => {
  g.showNodes()
  return g.search('start', 'end')
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