import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`
let [polymerTemplate, pairsArr] = importFile(dir, filename).split('\r\n\r\n')
let rules = new Map()
let occ = new Map()

pairsArr.split('\r\n').map(x => {
  const [left, right] = x.split(' -> ')
  rules.set(left, right)
})
polymerTemplate = polymerTemplate.split('')
polymerTemplate.map(x => {
  const count = occ.get(x) || 0
  occ.set(x, count + 1)
})

let pOcc = new Map()
for (let pos = 0; pos < polymerTemplate.length - 1; pos++) {
  const pair = polymerTemplate[pos] + polymerTemplate[pos + 1]
  const count = pOcc.get(pair) || 0
  pOcc.set(pair, count + 1)
}

const count = (steps) => {
  let pairOcc = new Map(pOcc)
  let occP2 = new Map(occ)
  for (let i = 1; i <= steps; i++) {
    let _occP2 = new Map(occP2)
    let _pairOcc = new Map(pairOcc)

    pairOcc.forEach((count, pair) => {
      const whatToInsert = rules.get(pair) // NN -> B
      const letterOccurance = _occP2.get(whatToInsert) || 0
      _occP2.set(whatToInsert, letterOccurance + count)

      const newPairs = [pair[0] + whatToInsert, whatToInsert + pair[1]]
      const countFirstPair = _pairOcc.get(newPairs[0]) || 0
      const countSecondPair = _pairOcc.get(newPairs[1]) || 0
      _pairOcc.set(newPairs[0], countFirstPair + count)
      _pairOcc.set(newPairs[1], countSecondPair + count)
      const pairCount = _pairOcc.get(pair)
      _pairOcc.set(pair, pairCount - count)
    })

    occP2 = new Map(_occP2)
    pairOcc = new Map(_pairOcc)
  }

  let min = Infinity
  let max = 0
  occP2.forEach(v => {
    if (v < min) min = v
    if (v > max) max = v
  })

  return max - min
}

const p1start = performance.now()
const p1 = count(10)
const p1end = performance.now()

const p2start = performance.now()
const p2 = count(40)
const p2end = performance.now()

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(2021, day, {p1, p2})