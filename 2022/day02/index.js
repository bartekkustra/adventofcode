import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
let input1 = importFile(dir, filename)
  .replace(/\r/g, '')
  .replace(/X/g, 'A')
  .replace(/Y/g, 'B')
  .replace(/Z/g, 'C')
  .split('\n')
  .map(x => x.split(' '))

let input2 = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n')
  .map(x => x.split(' '))

const GAME = {
  A: 1,
  B: 2,
  C: 3,
  win: 6,
  draw: 3,
  lose: 0,
}
const BEATS = {
  A: 'C',
  B: 'A',
  C: 'B',
}
const IS_BEATEN_BY = {
  A: 'B',
  B: 'C',
  C: 'A',
}

const part1 = () => {
  let score = 0
  
  for (const [elf, santa] of input1) {
    if (elf === santa) {
      score += GAME.draw + GAME[santa]
    }
    if (BEATS[elf] === santa) {
      score += GAME.lose + GAME[santa]
    }
    if (BEATS[santa] === elf) {
      score += GAME.win + GAME[santa]
    }
  }

  return score
}

const part2 = () => {
  let score = 0

  for (const [elf, endsWith] of input2) {
    if (endsWith === 'X') { // lose
      const santa = BEATS[elf]
      score += GAME.lose + GAME[santa]
    }
    if (endsWith === 'Y') { // draw
      const santa = elf
      score += GAME.draw + GAME[santa]
    }
    if (endsWith === 'Z') { // win
      const santa = IS_BEATEN_BY[elf]
      score += GAME.win + GAME[santa]
    }
  }

  return score
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