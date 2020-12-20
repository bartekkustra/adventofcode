import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '19'
const dir = `2020/day${day}`
const filename = `${day}.sample`
let [inputRules, inputLines] = importFile(dir, filename).replace(/\r/g, '').split('\n\n')
let rawRules = new Map()
let rulesMemo = new Map()

inputRules = inputRules.split('\n')
inputLines = inputLines.split('\n')

inputRules.forEach(rule => {
  rule = rule.split(': ')
  rawRules.set(parseInt(rule[0], 10), rule[1])
})

const computeRules = (ruleKey, ruleData) => {
  console.log(ruleKey, '->', ruleData)
  if (rulesMemo.has(ruleKey)) return rulesMemo.get(ruleKey)

  
}

const part1 = () => {
  console.log('rawRules', rawRules)
  rawRules.forEach((rule, key)=> {
    computeRules(key, rule)
  })
}

const part2 = () => {}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')