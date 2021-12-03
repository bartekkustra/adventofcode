import { performance } from 'perf_hooks'
import { importFile } from '../../utils/index.mjs'

const day = '03'
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\r\n')

console.clear()

const findMostCommonNumberOnIndex = (bits, idx) => {
  let ones = 0
  bits.forEach(bit => {
    if (bit[idx] === '1') ones++
  })
  return ones > bits.length / 2 ? '1' : '0'
}

const findMostCommonNumberOnIndex2 = (bits, idx) => {
  let ones = 0
  bits.forEach(bit => {
    if (bit[idx] === '1') ones++
  })
  return {
    ones,
    zeros: bits.length - ones
  }
}

const stringToBinary = (str) => parseInt(str, 2)

const findByCriteria = (which, bits, idx) => {
  if (which === 'o2') {
    let common = findMostCommonNumberOnIndex2(bits, idx)
    let filterBy;
    if (common.ones < common.zeros) {
      filterBy = '0'
    } else {
      filterBy = '1'
    }

    const output = bits.filter(bit => bit[idx] === filterBy)
    return output
  }
  
  if (which === 'co2') {
    let common = findMostCommonNumberOnIndex2(bits, idx)
    let filterBy
    if (common.zeros < common.ones) {
      filterBy = '0'
    } else if (common.ones < common.zeros) {
      filterBy = '1'
    } else {
      filterBy = '0'
    }
    const output = bits.filter(bit => bit[idx] === filterBy)
    return output
  }
}

const part1 = () => {
  let gammaRate = ''
  let epsilonRate = ''

  for(let i = 0; i < input[i].length; i++) {
    const mostCommonBit = findMostCommonNumberOnIndex(input, i)
    gammaRate += mostCommonBit
    if (mostCommonBit === '1') {
      epsilonRate += '0'
    } else {
      epsilonRate += '1'
    }
  }

  const gamma = stringToBinary(gammaRate)
  const epsilon = stringToBinary(epsilonRate)

  const powerConsumption = gamma * epsilon
  return powerConsumption
}

const part2 = () => {
  let oxygenGeneratorRating = ''
  let co2ScrubberRating = ''

  let o2input = [...input]
  let co2input = [...input]

  for(let i = 0; i < input[i].length; i++) {
    o2input.length !== 1 ? o2input = findByCriteria('o2', o2input, i) : null
    co2input.length !== 1 ? co2input = findByCriteria('co2', co2input, i) : null
  }

  const o2 = stringToBinary(o2input[0])
  const co2 = stringToBinary(co2input[0])
  
  return o2 * co2
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