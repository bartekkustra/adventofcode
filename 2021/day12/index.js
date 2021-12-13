import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`

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

  // doesnt work
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

  // doesnt work either
  dfs_search(source, destination, visited = {}) {
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

  // three times is a charm?
  search(source, visited = new Set(['start'])) {
    let ans = 0
    let queue = [{pos: source, caves: visited}]
    while(queue.length) {
      const {pos, caves} = queue.shift()
      if (pos === 'end') {
        ans++
        continue
      }
      const curr = this.#nodes[pos]
      for (let neighbour of curr) {
        if (!caves.has(neighbour)) {
          let newCaves = new Set(caves)
          if (neighbour !== neighbour.toUpperCase()) {
            newCaves.add(neighbour)
          }
          queue.push({pos: neighbour, caves: newCaves})
        }
      }
    }
    return ans
  }

  searchP2(source, allowTwoVisits, visited = new Set(['start'])) {
    let ans = 0
    let queue = [{pos: source, caves: visited, twoVisits: false}]
    while(queue.length) {
      const {pos, caves, twoVisits} = queue.shift()
      if (pos === 'end') {
        ans++
        continue
      }
      const curr = this.#nodes[pos]
      for (let neighbour of curr) {
        if (!caves.has(neighbour)) {
          let newCaves = new Set(caves)
          if (neighbour !== neighbour.toUpperCase()) {
            newCaves.add(neighbour)
          }
          queue.push({pos: neighbour, caves: newCaves, twoVisits})
        } else if (
          neighbour !== neighbour.toUpperCase() &&
          !twoVisits &&
          neighbour !== 'start' &&
          neighbour !== 'end'
        ) {
          queue.push({
            pos: neighbour, caves, twoVisits: true
          })
        }
      }
    }
    return ans
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

const part1 = () => g.search('start')

const part2 = () => g.searchP2('start', true)

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