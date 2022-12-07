import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()
console.log('\n\n\n------\n\n\n')

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`

let currentPath = []

class TreeNode {
  constructor(value, path = [], size = 0, children = []) {
    this.value = value
    this.size = Number(size)
    this.children = children
    this.path = path
  }
}

let tree = new TreeNode('/')

const addSizes = (node) => {
  if (!node) return 0
  let total = node.size
  if (total !== 0) return total

  if (node.children && node.children.length > 0) {
    for (let child of node.children) {
      total += addSizes(child)
    }
  }
  return total
}

// const findNode = (node, targetValue) => {
//   if (!node) return null;
//   if (node.value === targetValue) return node;
//   if (node.children && node.children.length > 0) {
//     for (let child of node.children) {
//       let foundNode = findNode(child, targetValue);
//       if (foundNode) return foundNode;
//     }
//   }
//   return null;
// }

// const findShallowNode = (node, targetValue) => {
//   if (!node) return null;
//   if (node.value === targetValue) return node;
//   if (node.children && node.children.length > 0) {
//     for (let child of node.children) {
//       if (child.value === targetValue) return child
//     }
//   }
//   return null;
// }

const traverseTree = (node, callback) => {
  if (!node) return
  callback(node)

  if (node.children && node.children.length > 0) {
    for (let child of node.children) {
      traverseTree(child, callback)
    }
  }
}

let input = importFile(dir, filename).split('\n').forEach(x => {
  if (x[0] === '$') {
    // command
    const commands = x.split(' ')
    commands.shift()
    const command = commands[0]
    if (command === 'cd') {
      const action = commands[1]
      if (action === '..') currentPath.pop()
      if (action === '/') currentPath = []
      if (action !== '/' && action !== '..') {
        currentPath.push(action)
      }
    }
  } else {
    // commandOutput
    const [size, file] = x.split(' ')
    let parentNode = tree
    let newNode;
    if (size === 'dir') {
      newNode = new TreeNode(file, currentPath)
    } else {
      newNode = new TreeNode(file, currentPath, size)
    }

    for (const path of currentPath) {
      for (const child of parentNode.children) {
        if (child.value === path) {
          parentNode = child
        }
      }
    }
    parentNode.children.push(newNode)
  }
})

traverseTree(tree, (node) => {
  node.size = addSizes(node)
})

// console.dir(tree, {depth: null})

const part1 = () => {
  let sum = 0
  let trees = []
  traverseTree(tree, (node) => {
    if (node.children.length > 0 && node.size <= 100000) {
      sum += node.size
    }
  })
  // console.dir(tree, {depth: null})
  // console.log(tree.value, tree.size)
  return sum
}

const part2 = () => {
  const spaceToFreeUp = 30000000 - 70000000 + tree.size
  let currentSmallestFolder = Infinity
  traverseTree(tree, (node) => {
    if (node.children && node.children.length > 0 && node.size > spaceToFreeUp && node.size < currentSmallestFolder)
      currentSmallestFolder = node.size
  })
  return currentSmallestFolder
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
updateMainBadge(2022, day, {p1, p2})