import { performance } from 'perf_hooks'
import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '07'
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split(',').map(Number).sort((a, b) => a - b)

const part1 = () => {
  let tempInput = [...input]
  while(tempInput.length > 2) {
    tempInput.pop()
    tempInput.shift()
  }

  const avg = tempInput.reduce((prev, curr) => prev + curr) / tempInput.length
  
  let fuel = 0
  input.forEach(el => {
    fuel += Math.abs(el - avg)
  })

  return fuel
}

let fuelCost = new Map()

const calculateFuelCost = (distance) => {
  if (fuelCost.has(distance)) return fuelCost.get(distance)
  if (fuelCost.has(distance - 1)) {
    const newFuelCost = fuelCost.get(distance - 1) + distance
    fuelCost.set(distance, newFuelCost)
    return newFuelCost
  }

  let cost = 0
  for(let i = 0; i <= distance; i++) {
    cost += i
  }
  fuelCost.set(distance, cost)
  return cost
}

const part2 = () => {
  let tempInput = [...input]
  const possibleSolutions = new Map()
  for(let i = tempInput[0]; i < tempInput[tempInput.length - 1]; i++) {
    let fuel = 0
    input.forEach(el => {
      const diff = Math.abs(el - i)
      const fuelCost = calculateFuelCost(diff)
      fuel += fuelCost
    })
    possibleSolutions.set(i, fuel)
  }


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