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
const part1Crates = JSON.parse(JSON.stringify(crates))
const part2Crates = JSON.parse(JSON.stringify(crates))
Object.entries(part2Crates).forEach(el => {
  part2Crates[el[0]] = el[1].join('')
})

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
      const oldCrate = part1Crates[step.fromStack]
      const newCrate = part1Crates[step.toStack]
      const crate = oldCrate.pop()
      newCrate.push(crate)
    }
  }
  
  return Object
    .values(part1Crates)
    .reduce((prev, curr) => prev + curr[curr.length - 1], '')
}

const part2 = () => {
  for (const step of instructions) {
    let oldCrate = part2Crates[step.fromStack]
    let newCrate = part2Crates[step.toStack]
    const startSlice = oldCrate.length - step.moves
    const grab = oldCrate.slice(-step.moves)
    oldCrate = oldCrate.slice(0, startSlice)
    newCrate = newCrate += grab
    part2Crates[step.fromStack] = oldCrate
    part2Crates[step.toStack] = newCrate
  }
  return Object
    .values(part2Crates)
    .reduce((prev, curr) => prev + curr[curr.length - 1], '')
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