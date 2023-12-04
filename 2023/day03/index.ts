import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()
console.log('-'.repeat(80), '\n')

const year = 2023
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

type EngineSchematic = Map<string, string>
interface Range {
  row: { min: number, max: number }
  col: { min: number, max: number }
}

interface Input {
  schematic: EngineSchematic
  symbols: string[]
  range: Range
  numbers: any[]
}

const isAdjacentToSymbol = (_pos: string[], symbols: string[], range: Range) => {
  let [originalRow, originalCol] = _pos[0].split(',').map(Number)
  const numLength = _pos.length
  for (let row = originalRow - 1; row <= originalRow + 1; row++) {
    for (let col = originalCol - 1; col <= originalCol + numLength; col++) {
      const newPos = `${row},${col}`
      if (_pos.includes(newPos)) continue
      if (row < range.row.min) continue
      if (row > range.row.max) continue
      if (col < range.col.min) continue
      if (col > range.col.max) continue
      if (symbols.includes(newPos)) return true
    }
  }
  return false
}

const findGear = (
  _pos: string,
  numbers: {
    value: string, 
    pos: string[]
  }[]
): number => {
  let [originalRow, originalCol] = _pos.split(',').map(Number)
  const x: Set<number> = new Set()
  for (let row = originalRow - 1; row <= originalRow + 1; row++) {
    for (let col = originalCol - 1; col <= originalCol + 1; col++) {
      const newPos = `${row},${col}`
      const adjacentNumbers = numbers.filter(number => number.pos.some(pos => pos === newPos))
      adjacentNumbers.forEach(number => {
        x.add(Number(number.value))
      })
    }
  }
  if (x.size === 2) {
    return Array.from(x.values()).reduce((a: number, b: number) => a * b, 1)
  }

  return 0
}

export const parsedInput = (ext: string): Input => {
  const schematic: EngineSchematic = new Map()
  const symbols: string[] = []
  const range: Range = {
    row: { min: 0, max: 0 },
    col: { min: 0, max: 0 },
  }
  const numbers: any[] = []
  
  importFile(filename + '.' + ext).split('\n').map((line, row) => {
    let col = 0
    for (const char of line) {
      const pos = `${row},${col}`
      schematic.set(pos, char)
      if (!/\d/.test(char) && char !== '.') symbols.push(pos)
      col++
    }
    range.row.max = row
    range.col.max = line.length - 1
  })

  let row = 0
  let col = 0
  while (true) {
    if (col > range.col.max) {
      row++
      col = 0
    }
    if (row > range.row.max) break

    let number: { value: string, pos: string[] } = { value: '', pos: [] }
    while(true) {
      const pos = `${row},${col}`
      const char = schematic.get(pos)
      if (/\d/.test(char)) {
        number['value'] += char
        number['pos'].push(pos)
        col++
      } else {
        break
      }
    }

    number.value !== '' && numbers.push(number)
    col++
  }

  return {schematic, symbols, range, numbers}
}


export const part1 = (input: Input): number => {
  let sumOfParts = 0
  for (const partNumber of input.numbers) {
    const isAdjacent = isAdjacentToSymbol(partNumber.pos, input.symbols, input.range)
    if (isAdjacent) sumOfParts += parseInt(partNumber.value)
  }

  return sumOfParts
}

export const part2 = (input: Input): number => {
  let sumOfParts = 0
  for (const symbol of input.symbols) {
    if (input.schematic.get(symbol) !== '*') continue
    const gearRatio = findGear(symbol, input.numbers)
    sumOfParts += gearRatio
  }

  return sumOfParts
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
  
  updateTimes(p1time, p2time, dir)
  updateMainBadge(year, day, {p1, p2})
}

if (require.main === module) {
  main()
}
