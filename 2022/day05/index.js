import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
let [start, initialInstructions] = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n\n')
  .map(x => x.split('\n'))

// prepare crates object
start = start.reverse()
let crates = {}
for (let index = 0; index < start[0].length; index++) {
  const crateId = Number(start[0][index])
  if (crateId !== 0) {
    for (let i = 1; i < start.length; i++) {
      const newCrate = start[i][index]
      if (newCrate !== ' ') {
        if (crates[crateId]) {
          crates[crateId].push(newCrate)
        } else {
          crates[crateId] = [newCrate]
        }
      }
    }
  }
}

// prepare instructions
let instructions = []
for (const instr of initialInstructions) {
  const [_1, moves, _2, fromStack, _3, toStack] = instr.split(' ')
  instructions.push({
    moves: Number(moves),
    fromStack: Number(fromStack),
    toStack: Number(toStack),
  })
}

const part1 = () => {
  for (const step of instructions) {
    for (let i = 0; i < step.moves; i++) {
      const oldCrate = crates[step.fromStack]
      const newCrate = crates[step.toStack]
      const crate = oldCrate.pop()
      newCrate.push(crate)
    }
  }
  
  return Object.values(crates).reduce((prev, curr) => {
    return prev + curr[curr.length - 1]
  }, '')
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

updateTimes(p1time, p2time, dir)
updateMainBadge(2022, day, {p1, p2})