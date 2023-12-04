import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()

const year = 2023
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

export const parsedInput = (ext?: string):any => importFile(filename + '.' + ext)
  .split('\n')
  .map(line => {
    let [_cardId, scratchpad] = line.split(':')
    const cardId = Number(_cardId.split(/\s/).filter(Boolean)[1])
    let [_winningNumbers, _yourNumbers] = scratchpad.split('|')
    const winningNumbers = _winningNumbers.split(/\s/).filter(Boolean).map(Number)
    const yourNumbers = _yourNumbers.split(/\s/).filter(Boolean).map(Number)
    const won = yourNumbers.filter((number: number) => winningNumbers.includes(number))

    return { cardId, winningNumbers, yourNumbers, won }
  })

export const part1 = (input: any[]): number => {
  let sumofPoints = 0
  for (const scratchpad of input) {
    const points = 2**(scratchpad.won.length - 1)
    sumofPoints += points >= 1 ? points : 0
  }
  return sumofPoints
}
/*
  card 1: 1, 
  card 2: 2
  card 3: 4,
  card 4: 8,
  card 5: 14,
  card 6: 1,
  total: 30
*/

export const part2 = (input: any[]): number => {
  const numberOfScratchPads: Map<number, any> = new Map()
  let currentIteration = 1

  while(currentIteration <= input.length) {
    let curr = numberOfScratchPads.get(currentIteration) || 0
    numberOfScratchPads.set(currentIteration, curr + 1)
    curr = numberOfScratchPads.get(currentIteration) || 90
    for (let i = 1; i <= curr; i++) {
      const {cardId, won} = input.filter(x => x.cardId === currentIteration)[0]
      for (let j = 1; j <= won.length; j++) {
        const subCurr = numberOfScratchPads.get(cardId + j) || 0
        numberOfScratchPads.set(cardId + j, subCurr + 1)
      }
    }
    currentIteration++
  }

  return Array.from(numberOfScratchPads.values()).reduce((a, b) => a + b, 0)
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
