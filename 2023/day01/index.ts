import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()

const year = 2023
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

export const parsedInput = (ext?: string): string[] => importFile(filename + '.' + ext).split('\n')

const NUMBERS: string[] = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]
const isNumberAsString = (text: string): boolean => NUMBERS.some(num => num.startsWith(text))

export const part1 = (input: string[]): number => {
  const p1Input: number[] = input.map((line: string) => {
    let leftPointer = 0
    let rightPointer = line.length - 1
    let first = undefined
    let last = undefined
    while (leftPointer <= rightPointer) {
      if (first !== undefined && last !== undefined) {
        break
      }
      const left = Number(line[leftPointer])
      const right = Number(line[rightPointer])
      if (!isNaN(left)) {
        first = left
      } else {
        leftPointer++
      }

      if (!isNaN(right)) {
        last = right
      } else {
        rightPointer--
      }
    }
    return parseInt(`${first}${last}`)
  })

  return p1Input.reduce((a, b) => a + b, 0)
}

export const part2 = (input: string[]): number => {
  const p2Input = input.map((line: string) => {
    let curr = 0
    let lineArr = []
    for (curr; curr < line.length; curr++) {
      let str = line[curr]
      if (!isNaN(parseInt(str))) {
        lineArr.push(Number(str))
        continue
      }
      if (isNumberAsString(str)) {
        let substr = str
        for (let i = curr + 1; i < line.length; i++) {
          substr += line[i]
          if (isNumberAsString(substr)) {
            const indexOfSubstr = NUMBERS.indexOf(substr)
            if (indexOfSubstr !== -1) {
              lineArr.push(indexOfSubstr)
              continue
            }
          } else {
            continue
          }
        }
      }
    }
    return (lineArr[0] * 10) + lineArr[lineArr.length - 1]
  })

  return p2Input.reduce((a, b) => a + b, 0)
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
