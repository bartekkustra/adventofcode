import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('').map(x => parseInt(x))

console.log('-- START --')

const getDestination = (arr, three, max) => {
  let currValue = arr[0]
  while (true) {
    currValue -= 1
    if (currValue < 1) currValue = max
    if (!three.includes(currValue)) break
  }
  return currValue
}

const part1 = () => {
  let input1 = [...input]
  // game

  const MAX_ITEMS = 9

  for (let i = 1; i <= 10; i++) {
    const pickedUp = [input1[1], input1[2], input1[3]]
    const destination = getDestination(input1, pickedUp, MAX_ITEMS)
    const destinationIndex = input1.indexOf(destination)

    input1 = [].concat(input1.slice(4, destinationIndex + 1), ...pickedUp, input1.slice(destinationIndex + 1), input1[0])
  }

  const indexOfOne = input1.indexOf(1)
  let res = ''
  for(let i = 1; i < input1.length; i++) {
    res += input1[(i + indexOfOne) % input1.length]
  }
  return res
}


const part2 = () => {
  const TOTAL_CUPS = 1000000
  const TOTAL_MOVES = 10000000
  
  const cups = [0]
  for (let cup = 1; cup <= TOTAL_CUPS; cup++) {
    let nextCup
    if (cup <= input.length) {
      nextCup = input[input.indexOf(cup) + 1] || input.length + 1
    } else if (cup === TOTAL_CUPS) {
      nextCup = input[0]
    } else {
      nextCup = cup + 1
    }

    cups[cup] = nextCup
  }

  let move = 1
  let currentCup = input[0]
  while (move <= TOTAL_MOVES) {
    const cupOne = cups[currentCup]
    const cupTwo = cups[cupOne]
    const cupThree = cups[cupTwo]
    cups[currentCup] = cups[cupThree]

    let destinationCup = currentCup
    do {
      destinationCup = destinationCup === 1 ? TOTAL_CUPS : destinationCup - 1
    } while ([cupOne, cupTwo, cupThree].includes(destinationCup))

    [cups[destinationCup], cups[cupThree]] = [cupOne, cups[destinationCup]]
    currentCup = cups[currentCup]

    move++
  }

  return cups[1] * cups[cups[1]]
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
updateMainBadge(2020, day, {p1, p2})