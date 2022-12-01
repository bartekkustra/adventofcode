import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const year = 2015
const day = getDay(import.meta.url)
const dir = `${year}/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n')

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
updateMainBadge(year, day, {p1, p2})