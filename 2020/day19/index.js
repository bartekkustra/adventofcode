import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let [inputRules, inputLines] = importFile(dir, filename).replace(/\r/g, '').split('\n\n')
let rawRules = new Map()
let rulesMemo = new Map()

inputRules = inputRules.split('\n')
inputLines = inputLines.split('\n')

inputRules.forEach(rule => {
  rule = rule.split(': ')
  rawRules.set(parseInt(rule[0], 10), rule[1])
})

const generateRuleRegexp = (ruleKey) => {
  const currentRuleData = rawRules.get(ruleKey)
  
  if (rulesMemo.has(ruleKey)) return rulesMemo.get(ruleKey)
  
  let result = ''
  if (/^".*"$/.test(currentRuleData)) {
    result = currentRuleData.replace(/"/g, '')
    rulesMemo.set(ruleKey, result)
  } else if (/\|/.test(currentRuleData)) {
    const options = currentRuleData.split(' | ')
    result = `(${generateRuleRegexp(options[0])}|${generateRuleRegexp(options[1])})`
  } else {
    if (currentRuleData === undefined) {
      const keys = ruleKey.split(' ')
      keys.forEach(key => {
        result += generateRuleRegexp(parseInt(key, 10))
      })
    } else {
      const keys = currentRuleData.split(' ')
      keys.forEach(key => {
        result += generateRuleRegexp(parseInt(key, 10))
      })
    }
  }
  if(typeof ruleKey === 'number') {
    rulesMemo.set(ruleKey, result)
  }
  return result
}

const part1 = () => {
  generateRuleRegexp(0)
  
  let ruleZero = new RegExp(`^${rulesMemo.get(0)}$`)

  const validInputLines = inputLines.filter(x => ruleZero.test(x)).length
  return validInputLines
}

const part2 = () => {
  // update rawRules
  rawRules.set(8, '42 | 42 8') // 42424242....
  rawRules.set(11, '42 31 | 42 11 31') // 42...31...

  generateRuleRegexp(42)
  generateRuleRegexp(31)

  let rule42 = `(?<group42>(${rulesMemo.get(42)})+)`
  let rule31 = `(?<group31>(${rulesMemo.get(31)})+)`
  let rule4231 = new RegExp(`^${rule42}${rule31}$`)

  let sum = 0
  inputLines.forEach(line => {
    const valid = rule4231.exec(line)
    if(valid) {
      const {group42, group31} = valid.groups
      const matchingRule42 = group42.match(new RegExp(rulesMemo.get(42), 'g')).length
      const matchingRule31 = group31.match(new RegExp(rulesMemo.get(31), 'g')).length
      // 42 must show up more often than 31
      //  as it is also in rule 8
      if(matchingRule42 > matchingRule31) {
        sum++
      }
    }
  })
  return sum
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
updateMainBadge(2020, day, {p1, p2})