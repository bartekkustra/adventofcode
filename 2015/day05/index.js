import md5 from 'md5'
import { importFile } from '../../utils/index.mjs'

const day = '05'
const dir = `2015/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n')

console.clear()

const isNice = (str) => {
  // bad strings
  const badStrings = new RegExp('(ab)|(cd)|(pq)|(xy)')
  if(badStrings.test(str)) return false
  
  // at least 3 vowels
  const vowels = ['a', 'e', 'i', 'o', 'u']
  let vowelCounter = 0
  vowels.forEach(vowel => {
    let newStr = str
    const vowelRgxp = new RegExp(`[^${vowel}]`, 'g')
    const howMany = newStr.replace(vowelRgxp, '').length
    vowelCounter += howMany
  })
  if(vowelCounter < 3) return false

  // at least one letter twice in a row
  let yeap = false
  let i = 0
  while(i < str.length - 1) {
    if(str[i] === str[i + 1]) {
      yeap = true
      break;
    }
    i++
  }
  if(!yeap) return false
  
  return true
}

const isNicer = (str) => {
  // at least one letter with one in-between
  let yeap = false
  let i = 0
  while(i < str.length - 2) {
    if(str[i] === str[i + 2] && str[i] !== str[i+1]) {
      yeap = true
      break
    }
    i++
  }
  if(!yeap) return false
  
  // pair of letters
  let pairExist = false
  for(let j = 0; j < str.length - 1; j++) {
    const pair = `${str[j]}${str[j+1]}`
    const pairRgxp = new RegExp(`(${pair})`, 'g')

    const match = str.match(pairRgxp).length
    if(match >= 2) pairExist = true
  }
  if(!pairExist) return false
  
  return true
}

const part1 = () => input.filter(string => isNice(string)).length

const part2 = () => input.filter(string => isNicer(string)).length

console.time('part1')
const p1 = part1()
console.timeEnd('part1')
console.log(p1)

console.time('part2')
const p2 = part2()
console.timeEnd('part2')
console.log(p2)
