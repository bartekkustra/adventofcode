import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '19'
const dir = `2020/day${day}`
const filename = `${day}.sample`
let [inputRules, inputLines] = importFile(dir, filename).replace(/\r/g, '').split('\n\n')
let rawRules = new Map()

inputRules = inputRules.split('\n')
inputLines = inputLines.split('\n')

inputRules.forEach(rule => {
  rule = rule.split(': ')
  rawRules.set(parseInt(rule[0], 10), rule[1])
})

let rulesMemo = new Map()

const generateRule = (ruleId, ruleData) => {
  if (rulesMemo.has(ruleId)) return rulesMemo.get(ruleId)
  ruleData = rawRules.get(ruleId)

  let result = ''
  if (/^".*"$/.test(ruleData)) {
    result = ruleData.replace(/"/g, '')
  } else if (/\|/.test(ruleId)) {
    console.log(' -> ', rawRules.get(ruleId))
    const possibilities = rawRules.get(ruleId).split(' | ')
    result = `(${generateRule(possibilities[0])}|${generateRule(possibilities[1])})`
  }
  return result
}

const part1 = () => {
  console.log('rawRules', rawRules)
  generateRule(0, rawRules)

  console.log('compiledRules', rulesMemo)
}

const part2 = () => {}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')