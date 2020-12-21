import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '19'
const dir = `2020/day${day}`
const filename = `${day}.sample2`
let [inputRules, inputLines] = importFile(dir, filename).replace(/\r/g, '').split('\n\n')
let rawRules = new Map()
let rulesMemo = new Map()

inputRules = inputRules.split('\n')
inputLines = inputLines.split('\n')

inputRules.forEach(rule => {
  rule = rule.split(': ')
  rawRules.set(parseInt(rule[0], 10), rule[1])
})

const computeRules = (ruleKey) => {
  const currentRuleData = rawRules.get(ruleKey)
  
  if (rulesMemo.has(ruleKey)) return rulesMemo.get(ruleKey)
  
  let result = ''
  if (/^".*"$/.test(currentRuleData)) {
    result = currentRuleData.replace(/"/g, '')
    rulesMemo.set(ruleKey, result)
  } else if (/\|/.test(currentRuleData)) {
    const options = currentRuleData.split(' | ')
    result = `(${computeRules(options[0])}|${computeRules(options[1])})`
  } else {
    if (currentRuleData === undefined) {
      const keys = ruleKey.split(' ')
      keys.forEach(key => {
        result += computeRules(parseInt(key, 10))
      })
    } else {
      const keys = currentRuleData.split(' ')
      keys.forEach(key => {
        result += computeRules(parseInt(key, 10))
      })
    }
  }
  if(typeof ruleKey === 'number') {
    rulesMemo.set(ruleKey, result)
  }
  return result
}

const part1 = () => {
  computeRules(0)
  
  let ruleZero = new RegExp(`^${rulesMemo.get(0)}$`)

  const validInputLines = inputLines.filter(x => ruleZero.test(x)).length
  return validInputLines
}

const part2 = () => {
  // update rawRules
  rawRules.set(8, '42 | 42 8') // 42424242....
  rawRules.set(11, '42 31 | 42 11 31') // 42...31...

  computeRules(42)
  computeRules(31)

  let rule42 = `(?<group42>(${rulesMemo.get(42)})+)`
  let rule31 = `(?<group31>(${rulesMemo.get(31)})+)`
  let rule4231 = new RegExp(`^${rule42}${rule31}$`)

  let sum = 0
  inputLines.forEach(line => {
    const valid = rule4231.exec(line)
    if(valid) {
      const {groups} = valid
      const matchingRule42 = groups.group42.match(new RegExp(rulesMemo.get(41), 'g')).length
      const matchingRule31 = groups.group31.match(new RegExp(rulesMemo.get(31), 'g')).length
      if(matchingRule42 > matchingRule31) {
        sum++
      }
    }
  })
  return sum
}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')