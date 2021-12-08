import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\r\n').map(x => {
  let [pattern, output] = x.split(' | ')
  pattern = pattern.split(' ').map(y => y.split(' ')).map(x => x.join(''))
  output = output.split(' ').map(y => y.split(' ')).map(x => x.join(''))
  return {
    pattern,
    output
  }
})

// console.dir(input, {depth: null})

const digits = {
  'abcefg': 0,
  'cf': 1,
  'acdeg': 2,
  'acdfg': 3,
  'bcdf': 4,
  'abdfg': 5,
  'abdefg': 6,
  'acf': 7,
  'abcdefg': 8,
  'abcdfg': 9,
}

const digitsByLength = {
  2: [digits['cf']],
  3: [digits['acf']],
  4: [digits['bcdf']],
  5: [
    digits['acdeg'],
    digits['acdfg'],
    digits['abdfg'],
  ],
  6: [
    digits['abcefg'],
    digits['abdefg'],
    digits['abcdfg'],
  ],
  7: [digits['abcdefg']]
}

const part1 = () => {
  let occurance = new Map()
  occurance.set(1, {
    count: 0,
    letters: '',
  })
  occurance.set(4, {
    count: 0,
    letters: '',
  })
  occurance.set(7, {
    count: 0,
    letters: '',
  })
  occurance.set(8, {
    count: 0,
    letters: '',
  })
  
  input.forEach(line => {
    line.output.forEach(word => {
      const prediction = digitsByLength[word.length]
      if (prediction.length === 1) {
        const number = prediction[0]
        const curr = occurance.get(number)
        curr.count = curr.count + 1
        curr.letters = word
        occurance.set(number, curr)
      }
    })
  })
  
  let sum = 0
  occurance.forEach(x => sum += x.count)
  return {sum, occurance}
}

const part2 = () => {
  let result = 0

  input.forEach(({pattern, output}) => {
    const findByLength = condition /* : number | function */ => {
      if (typeof condition === 'number') {
        const length = condition
        condition = c => c.length === length
      }
      const idx = pattern.findIndex(condition)
      return pattern.splice(idx, 1)[0]
    }

    const removeFromArray = (fromThis, removeThis) =>
      fromThis.split('').filter(x => !removeThis.includes(x)).join('')

    const checkIfIncluded = (checkIfThis, coversThis) =>
      removeFromArray(coversThis, checkIfThis).length === 0

    // 1, 4, 7, 8 have unique length
    const numbers = {
      1: findByLength(2),
      4: findByLength(4),
      7: findByLength(3),
      8: findByLength(7),
    }
    
    // 9 includes 4
    numbers[9] = findByLength(a => checkIfIncluded(a, numbers[4]))
    
    // 0 includes 1, 6 doesnt have it
    numbers[0] = findByLength(a => (a.length === 6) && checkIfIncluded(a, numbers[1]))
    numbers[6] = findByLength(6)
    
    // 3 includes 7
    numbers[3] = findByLength(a => checkIfIncluded(a, numbers[7]))
    
    // 2 has 4 letters common with 4
    // 5 has 3 letters common with 4
    numbers[2] = findByLength(a => removeFromArray(numbers[4], a).length === 2)
    numbers[5] = findByLength(5)
    
    const digits = new Map()

    for(let digit in numbers) {
      // sort the pattern
      const sortedNumbers = numbers[digit].split('').sort().join('')
      digits.set(sortedNumbers, digit)
    }

    // sort the output from the input lol
    output = output.map(x => x.split('').sort().join(''))
    
    // add the number from the output to the overall result
    result += +output.map(x => digits.get(x)).join("")
  })
  return result
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
console.log('part1', p1.sum)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(2021, day, {p1, p2})