import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge, blocks } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\r\n').map(x => x.split('').map(Number))

let theMap = new Map()
const maxRow = input.length
const maxCol = input[0].length
for (let row = 0; row < maxRow; row++) {
  for (let col = 0; col < maxCol; col++) {
    const pos = `${col},${row}`
    theMap.set(pos, input[row][col])
  }
}

const SIZE = 5
const endP1 = `${input[0].length - 1},${input.length - 1}`
const endP2 = `${input[0].length * SIZE - 1},${input.length * SIZE - 1}`

let theMapBig = new Map()
const maxRowBig = (input.length) * SIZE
const maxColBig = (input[0].length) * SIZE
for (let row = 0; row < maxRowBig; row++) {
  for (let col = 0; col < maxColBig; col++) {
    const rowMulti = Math.floor(row / maxRow)
    const colMulti = Math.floor(col / maxCol)
    const pos = `${col},${row}`
    let a = input[row % maxRow][col % maxCol] + rowMulti + colMulti
    if (a > 9) {
      a = a % 9
    }
    
    theMapBig.set(pos, a)
  }
}

// DRAW THAT SHIT
// let str = ''
// for (let row = 0; row < maxRowBig; row++) {
//   for (let col = 0; col < maxColBig; col++) {
//     const pos = `${col},${row}`
//     str += theMapBig.get(pos)
//   }
//   str += '\n'
// }
// console.log(str)

class Graph {
  #nodes
  #adjacencyList
  
  constructor() {
    this.#nodes = new Set()
    this.#adjacencyList = {}
  }
  
  addNode(node) {
    this.#nodes.add(node)
    this.#adjacencyList[node] = {}
  }
  
  addEdge(node1, node2, weight) {
    this.#adjacencyList[node1][node2] = weight
    // this.#adjacencyList[node2][node1] = weight
  }
  
  getList() {
    return this.#adjacencyList
  }
  
  show() {
    console.dir({nodes: this.#nodes, list: this.#adjacencyList}, {depth: null})
  }
}

let g0 = new Graph()
g0.addNode('0,0')
g0.addNode('1,0')
g0.addNode('0,1')
g0.addNode('1,1')
g0.addEdge('0,0', '0,1', 1)
g0.addEdge('0,0', '1,0', 1)
g0.addEdge('1,0', '0,0', 1)
g0.addEdge('1,0', '1,1', 1)
g0.addEdge('0,1', '0,0', 1)
g0.addEdge('0,1', '1,1', 1)
g0.addEdge('1,1', '1,0', 1)
g0.addEdge('1,1', '0,1', 1)

// part1 graph
let g1 = new Graph()
// add all nodes
theMap.forEach((value, pos) => g1.addNode(pos))
// add edges
theMap.forEach((value, pos) => {
  const [x,y] = pos.split(',').map(Number)
  const vectors = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  for (let vec of vectors) {
    const newPos = {
      x: x + vec[0],
      y: y + vec[1],
    }
    if (newPos.x >= 0 && newPos.x < maxCol && newPos.y >= 0 && newPos.y < maxRow) {
      const newPosStr = `${newPos.x},${newPos.y}`
      g1.addEdge(pos, newPosStr, theMap.get(newPosStr))
    }
  }
})

// part1 graph
let g2 = new Graph()
// add all nodes
theMapBig.forEach((value, pos) => g2.addNode(pos))
// add edges
theMapBig.forEach((value, pos) => {
  const [x,y] = pos.split(',').map(Number)
  const vectors = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  for (let vec of vectors) {
    const newPos = {
      x: x + vec[0],
      y: y + vec[1],
    }
    if (newPos.x >= 0 && newPos.x < maxColBig && newPos.y >= 0 && newPos.y < maxRowBig) {
      const newPosStr = `${newPos.x},${newPos.y}`
      g2.addEdge(pos, newPosStr, theMapBig.get(newPosStr))
    }
  }
})


const shortestDistanceNode = (distances, visited) => {
  // create a default value for shortest
  let shortest = null
  
  // for each node in the distances object
  for (let node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    let currentIsShortest = shortest === null || distances[node] < distances[shortest]
    
    // and if the current node is in the unvisited set
    if (currentIsShortest && !visited.has(node)) {
      // update shortest to be the current node
      shortest = node
    }
  }
  return shortest
}

const findShortestPath = (graph, startNode, endNode) => {
  // track distances from the start node using a hash object
  let distances = {}
  distances[endNode] = 'Infinity'
  distances = {...distances, ...graph[startNode]}
  
  // track paths using a hash object
  let parents = { endNode: null }
  for (let child in graph[startNode]) {
    parents[child] = startNode
  }
  
  // collect visited nodes
  let visited = new Set()
  
  // find the nearest node
  let node = shortestDistanceNode(distances, visited)
  
  // for that node:
  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node]
    let children = graph[node]
    
    // for each of those child nodes:
    for (let child in children) {
      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        continue
      } else {
        // save the distance from the start node to the child node
        let newdistance = distance + children[child]

        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        if (!distances[child] || distances[child] > newdistance) {
          // save the distance to the object
          distances[child] = newdistance
          
          // record the path
          parents[child] = node
        } 
      }
    }  
    
    // move the current node to the visited set
    visited.add(node)
    
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
  }
  
  // using the stored paths from start node to end node
  // record the shortest path
  // let shortestPath = [endNode]
  // let parent = parents[endNode]
  
  // while (parent) {
  //   shortestPath.push(parent)
  //   parent = parents[parent]
  // }
  // shortestPath.reverse()
  
  //this is the shortest path
  let results = {
    distance: distances[endNode],
    // path: shortestPath,
  }

  // return the shortest path & the end node's distance from the start node
  return results
}

const part0 = () => findShortestPath(g0.getList(), '0,0', '1,1').distance
const part1 = () => findShortestPath(g1.getList(), '0,0', endP1).distance
const part2 = () => findShortestPath(g2.getList(), '0,0', endP2).distance

part0()
part0()
part0()
part0()
part0()
part0()

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p2start = performance.now()
const p2 = part2()
const p2end = performance.now()

// DRAW THAT SHIT
// let str = ''
// for (let row = 0; row < maxRowBig; row++) {
//   for (let col = 0; col < maxColBig; col++) {
//     const pos = `${col},${row}`
//     if (p2.path.includes(pos)) {
//       str += blocks.full
//     } else {
//       str += blocks.empty
//     }
//   }
//   str += '\n'
// }
// console.log(str)

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(2021, day, {p1, p2})