import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()

const year = 2023
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

export const parsedInput = (ext?: string): string[] => importFile(filename + '.' + ext).split('\n')

enum ENUMBERS {
  zero = 0,
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
  seven = 7,
  eight = 8,
  nine = 9,
}

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
    return first * 10 + last
  })

  return p1Input.reduce((a, b) => a + b, 0)
}

export const part2 = (input: string[]): number => {
  const p2InputPointers = input.map((line: string) => {
    let leftPointer = 0
    let rightPointer = line.length - 1
    let first = undefined
    let last = undefined
    
    while (leftPointer <= rightPointer) {
      if (first !== undefined && last !== undefined) {
        break
      }

      let leftStr = line[leftPointer]
      let rightStr = line[rightPointer]
      let left = Number(leftStr)
      let right = Number(rightStr)

      // left -> right
      if (!isNaN(left)) {
        first = left
      } else {
        for (let i = leftPointer + 1; i < line.length; i++) {
          leftStr += line[i]
          if (NUMBERS.some(n => n.startsWith(leftStr))) {
            const indexOfNum = NUMBERS.indexOf(leftStr)
            if (indexOfNum > -1) {
              first = indexOfNum
              continue
            }
          } else {
            continue
          }
        }
        leftPointer++
      }

      // right -> left
      if (!isNaN(right)) {
        last = right
      } else {
        for (let i = rightPointer - 1; i >= 0; i--) {
          rightStr = line[i] + rightStr
          if (NUMBERS.some(n => n.endsWith(rightStr))) {
            const indexOfNum = NUMBERS.indexOf(rightStr)
            if (indexOfNum > -1) {
              last = indexOfNum
              continue
            }
          } else {
            continue
          }
        }
        rightPointer--
      }
    }
    return first * 10 + last
  })

  return p2InputPointers.reduce((a, b) => a + b, 0)
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
