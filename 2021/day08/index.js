import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.sample2`
let input = importFile(dir, filename).split('\r\n').map(x => {
  let [pattern, output] = x.split(' | ')
  pattern = pattern.split(' ').map(y => y.split(' '))
  output = output.split(' ').map(y => y.split(' '))
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

const lengthByNumber = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6,
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

const sortPattern = (word) => word.split('').sort().join('')

const findPermutations = (string) => {
  if (!string || typeof string !== "string"){
    return "Please enter a string"
  } else if (string.length < 2 ){
    return string
  }

  let permutationsArray = [] 
   
  for (let i = 0; i < string.length; i++){
    let char = string[i]

    if (string.indexOf(char) != i)
    continue

    let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)

    for (let permutation of findPermutations(remainingChars)){
      permutationsArray.push(char + permutation) }
  }
  return permutationsArray
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
    line.output.forEach(pattern => {
      pattern.forEach(word => {
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
  })
  
  let sum = 0
  occurance.forEach(x => sum += x.count)
  return {sum, occurance}
}

const removeLetters = (removeThis, fromThis) => {
  removeThis = removeThis.split('')
  removeThis.forEach(letter => fromThis = fromThis.replace(letter, ''))
  return fromThis
}

const updateLetters = (m, n, l) => {
  m.set(n, l)

  m.forEach((el, number) => {
    if (number !== n) {
      m.set(number, el.replace(m.get(n), ''))
    }
  })
  return m
}

const removeFrom = (m, rmarr, valarr) => {
  rmarr.forEach(which => {
    let curr = m.get(which)
    const rgxp = new RegExp(`[${valarr.split('').join('|')}]`, 'g')
    curr = curr.replace(rgxp, '')
    m.set(which, curr)
  })
  return m
}
const part2 = () => {
  let lines = new Map()
  lines.set('top', 'abcdefg')
  lines.set('topLeft', 'abcdefg')
  lines.set('topRight', 'abcdefg')
  lines.set('middle', 'abcdefg')
  lines.set('bottomLeft', 'abcdefg')
  lines.set('bottomRight', 'abcdefg')
  lines.set('bottom', 'abcdefg')
  let occurance = new Map()
  occurance.set(0, 'abcdefg')
  occurance.set(1, 'abcdefg')
  occurance.set(2, 'abcdefg')
  occurance.set(3, 'abcdefg')
  occurance.set(4, 'abcdefg')
  occurance.set(5, 'abcdefg')
  occurance.set(6, 'abcdefg')
  occurance.set(7, 'abcdefg')
  occurance.set(8, 'abcdefg')
  occurance.set(9, 'abcdefg')
  
  input.forEach(line => {
    line.pattern.forEach(pattern => {
      pattern.forEach(word => {
        const prediction = digitsByLength[word.length]
        if (prediction.length === 1) {
          const number = prediction[0]
          const curr = occurance.get(number)
          occurance.set(number, word)
        }
      })
    })

    // 7 from 1
    const top = removeLetters(occurance.get(1), occurance.get(7))
    lines.set('top', top)
    lines = updateLetters(lines, 'top', top)
    // remove top from 1, 4
    occurance = removeFrom(occurance, [1,4], top)

    // 4 from 1
    const topLeftAndMid = removeLetters(occurance.get(1), occurance.get(4))
    const topRightAndBottomRight = occurance.get(1)
    
    const topLeftAndMidArr = topLeftAndMid.split('')
    const topRightAndBottomRightArr = topRightAndBottomRight.split('')

    let sumOfAll = 0

    for(let i = 0; i < topLeftAndMidArr.length; i++) {
      for(let j = 0; j < topRightAndBottomRightArr.length; j++) {
        let createPattern = top
        let topRight = ''
        let bottomRight = ''
        let topLeft = ''
        let middle = ''
        // top,topleft,mid,topRight,bottomRight,...rest
        if (i === 0)  {
          topLeft = topLeftAndMidArr[0]
          middle = topLeftAndMidArr[1]
        } else {
          topLeft = topLeftAndMidArr[1]
          middle = topLeftAndMidArr[0]
        }
        if (j === 0)  {
          topRight = topRightAndBottomRightArr[0]
          bottomRight = topRightAndBottomRightArr[1]
        } else {
          topRight = topRightAndBottomRightArr[1]
          bottomRight = topRightAndBottomRightArr[0]
        }

        createPattern += topLeft + middle + topRight + bottomRight

        const permStrRgxp = new RegExp(`${top}|${topLeft}|${middle}|${topRight}|${bottomRight}`, 'g')
        const remainingPermutationsString = 'abcdefg'.replace(permStrRgxp, '')
        const permutations = findPermutations(remainingPermutationsString)
        permutations.forEach(perm => {
          const finalStr = createPattern + perm
          lines.set('topLeft', finalStr[1])
          lines.set('middle', finalStr[2])
          lines.set('topRight', finalStr[3])
          lines.set('bottomRight', finalStr[4])
          lines.set('bottomLeft', finalStr[5])
          lines.set('bottom', finalStr[6])

          const letters = buildLetters(lines)
          const patt = line.pattern.map(x => x.join('')).map(x => x.split('').sort().join(''))
          // console.log({letters, patt})

          let num = 0
          while(patt.length > 0) {
            if (num >= 10) break
            const idx = patt.indexOf(patt[num])
            if(idx > -1) {
              patt.splice(idx, 1)
            }
            num++
          }
          if (patt.length === 0) {
            console.log('found')
          } else {
            console.log('nope')
          }
          // const out = line.output.map(x => x.join(''))
          // console.log('output', out)
          // const lettersKeys = Object.values(letters).map(x => sortPattern(x))
          // const patt = line.pattern.map(x => x.join('')).map(x => sortPattern(x)).sort()
          // const currentPattern = sortPattern(line.pattern)
          // for(let d = 0; d < patt.length; d++) {
            // if(lettersKeys[d] === patt[d]) {
              // const finalNumbers = line.output.map(x => x.join(''))
              // finalNumbers.forEach()
            // }
          // }
        })
      }
    }
  })
}

const buildLetters = (m) => {
  let {
    top,
    topLeft,
    topRight,
    middle,
    bottomLeft,
    bottomRight,
    bottom
  } = Object.fromEntries(m)
  let numbers = {}

  numbers[1] = (topRight + bottomRight).split('').sort().join('')
  numbers[2] = (top + topRight + middle + bottomLeft + bottom).split('').sort().join('')
  numbers[3] = (top + topRight + middle + bottomRight + bottom).split('').sort().join('')
  numbers[4] = (topLeft + topRight + middle + bottomRight).split('').sort().join('')
  numbers[5] = (top + topLeft + middle + bottomRight + bottom).split('').sort().join('')
  numbers[6] = (top + topLeft + middle + bottomLeft + bottomRight + bottom).split('').sort().join('')
  numbers[7] = (top + topRight + bottomRight).split('').sort().join('')
  numbers[8] = (top + topLeft + topRight + middle + bottomLeft + bottomRight + bottom).split('').sort().join('')
  numbers[9] = (top + topLeft + topRight + middle + bottomRight + bottom).split('').sort().join('')
  numbers[0] = (top + topLeft + topRight + bottomLeft + bottomRight + bottom).split('').sort().join('')
  return numbers
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
// updateMainBadge(2021, day, {p1, p2})