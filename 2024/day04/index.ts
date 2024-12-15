import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()
console.log('-'.repeat(20))

const year = 2024
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

type Input = any

export const parsedInput = (ext: string): Input => {
  let charMap = new Map<string, string>()
  let xPos: string[] = []
  let aPos: string[] = []
  importFile(filename + '.' + ext)
    .split('\n')
    .forEach((line, lineIndex) => {
      line
        .split('')
        .forEach((char, charIndex) => {
          charMap.set(`${lineIndex},${charIndex}`, char)
          if (char === 'X') xPos.push(`${lineIndex},${charIndex}`)
          if (char === 'A') aPos.push(`${lineIndex},${charIndex}`)
        })
    })
  return { charMap, xPos, aPos }
}

const getAdjacent = ({ dir, charMap, pos, next, complete, xmas }: { dir: number[], charMap: Map<string, string>, pos: { x: number, y: number }, next: number, complete: number, xmas: string[] }): number => {
  if (next === xmas.length) {
    return complete + 1
  }
  if (dir.length === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue
        const adj = { x: pos.x + i, y: pos.y + j }
        const adjChar = charMap.get(`${adj.x},${adj.y}`)
        if (adjChar === xmas[next]) {
          complete = getAdjacent({ dir: [i, j], charMap, pos: adj, next: next + 1, complete, xmas })
        }
      }
    }
  } else {
    // direction specified, check only that direction
    const adj = { x: pos.x + dir[0], y: pos.y + dir[1] }
    const adjChar = charMap.get(`${adj.x},${adj.y}`)
    if (adjChar === xmas[next]) {
      complete = getAdjacent({ dir, charMap, pos: adj, next: next + 1, complete, xmas })
    }
  }

  return complete
}

const getCross = ({ charMap, pos }: { charMap: Map<string, string>, pos: {x: number, y: number} }): boolean => {
  const topright = { x: pos.x + 1, y: pos.y - 1 }
  const bottomleft = { x: pos.x - 1, y: pos.y + 1 }
  const topleft = { x: pos.x - 1, y: pos.y - 1 }
  const bottomright = { x: pos.x + 1, y: pos.y + 1 }

  let diag1 = (charMap.get(`${topright.x},${topright.y}`) === 'M' && charMap.get(`${bottomleft.x},${bottomleft.y}`) === 'S') ||
              (charMap.get(`${topright.x},${topright.y}`) === 'S' && charMap.get(`${bottomleft.x},${bottomleft.y}`) === 'M')
  let diag2 = (charMap.get(`${topleft.x},${topleft.y}`) === 'M' && charMap.get(`${bottomright.x},${bottomright.y}`) === 'S') ||
              (charMap.get(`${topleft.x},${topleft.y}`) === 'S' && charMap.get(`${bottomright.x},${bottomright.y}`) === 'M')
  return diag1 && diag2
}

export const part1 = (input: Input): number => {
  const { charMap, xPos } = input
  const xmas = ['M', 'A', 'S']
  let found = 0
  let start = 0
  // let stop = 1
  let stop = xPos.length
  for (let i = start; i < stop; i++) {
    const pos = xPos[i]
    const numberOfPaths = getAdjacent({
      dir: [],
      charMap,
      pos: { x: parseInt(pos.split(',')[0]), y: parseInt(pos.split(',')[1]) },
      next: 0,
      complete: 0,
      xmas,
    })
    found += numberOfPaths
  }

  return found
}

export const part2 = (input: Input): number => {
  const { charMap, aPos } = input
  let found = 0
  for (const pos of aPos) {
    const isCross = getCross({ charMap, pos: { x: parseInt(pos.split(',')[0]), y: parseInt(pos.split(',')[1]) } })
    if (isCross) {
      found++
    }
  }
  return found
}

const main = () => {
  const p0start = performance.now()
  const p0 = parsedInput('in')
  const p0end = performance.now()

  const p1start = performance.now()
  const p1 = part1(parsedInput('in'))
  const p1end = performance.now()
  
  const p2start = performance.now()
  const p2 = part2(parsedInput('in'))
  const p2end = performance.now()
  
  const p0time = (p0end - p0start).toFixed(3)
  const p1time = (p1end - p1start).toFixed(3)
  const p2time = (p2end - p2start).toFixed(3)
  console.log(`input: ${p0time}ms`)
  console.log('---')
  console.log(`part1: ${p1time}ms`)
  console.log('part1', p1)
  console.log(`part2: ${p2time}ms`)
  console.log('part2', p2)
  
  // updateTimes(p1time, p2time, dir)
  // updateMainBadge(year, day, {p1, p2})
}

if (require.main === module) {
  main()
}
