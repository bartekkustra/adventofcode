import { performance } from 'perf_hooks'
import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '07'
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split(',').map(Number).sort((a, b) => a - b)

const calculateFuelCost = (distance) => {
  if (fuelCost.has(distance)) return fuelCost.get(distance)
  
  const newFuelCost = calculateFuelCost(distance - 1) + distance
  fuelCost.set(distance, newFuelCost)
  return newFuelCost
}

const part1 = () => {
  let left = 0
  let right = input.length - 1

  while(right - left > 1) {
    left++
    right--
  }

  const avg = (input[left] + input[right]) / 2

  let fuel = 0
  input.forEach(el => {
    fuel += el > avg ? el - avg : avg - el
  })

  return fuel
}

let fuelCost = new Map()
fuelCost.set(0, 0)
const part2 = () => {
  const possibleSolutions = new Map()

  input.forEach(el => possibleSolutions.set(el, input.reduce((prev, curr) => prev + calculateFuelCost(Math.abs(curr - el)))))

  return Array.from(possibleSolutions, ([idx, v]) => v).sort((a, b) => a - b)[0]
}

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p2start = performance.now()
const p2 = part2()
const p2end = performance.now()

console.log(`part1: ${(p1end - p1start).toFixed(3)}ms`)
console.log('part1', p1)
console.log(`part2: ${(p2end - p2start).toFixed(3)}ms`)
console.log('part2', p2)