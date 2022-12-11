import { performance } from 'perf_hooks'
import { v4 as uuidv4 } from 'uuid';
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2022/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n\n')
  .map(x => {
    let [
      monkey,
      items,
      operation,
      test,
      ifTrue,
      ifFalse,
    ] = x.split('\n')
    
    monkey = monkey
      .replace(':', '')
      .split(' ')
      .map(Number)[1]

    items = items
      .trim()
      .replace('Starting items: ', '')
      .split(', ')
      .map(Number)

    operation = operation
      .trim()
      .replace('Operation: new = old ', '')
      .split(' ')

    test = Number(test
      .trim()
      .replace('Test: divisible by ', ''))

    ifTrue = Number(
      ifTrue
        .trim()
        .replace('If true: throw to monkey ', ''))
    
    ifFalse = Number(
      ifFalse
        .trim()
        .replace('If false: throw to monkey ', ''))
    
    return {
      monkey,
      items,
      test,
      operation,
      ifTrue,
      ifFalse,
      inspectionCounter: 0,
    }
  })

  
  
  const monkeys1 = new Map()
  const monkeys2 = new Map()
  let inp1 = JSON.parse(JSON.stringify(input))
  let inp2 = JSON.parse(JSON.stringify(input))
  for (const monkey of inp1) {
    monkeys1.set(monkey.monkey, {
      items: [...monkey.items],
      test: 0 + monkey.test,
      operation: [...monkey.operation],
      ifTrue: 0 + monkey.ifTrue,
      ifFalse: 0 + monkey.ifFalse,
      inspectionCounter: 0,
    })
  }
  for (const monkey of inp2) {
    monkeys2.set(monkey.monkey, {
      items: [...monkey.items],
      test: 0 + monkey.test,
      operation: [...monkey.operation],
      ifTrue: 0 + monkey.ifTrue,
      ifFalse: 0 + monkey.ifFalse,
      inspectionCounter: 0,
    })
  }

const calculateMaxWorryLevel = (monkeysSet) => {
  let maxWorryLevel = 1
  monkeysSet.forEach(monkey => {
    maxWorryLevel *= monkey.test
  })
  return maxWorryLevel
}

const solve = (ROUNDS, isPart2) => {
  const monkeysSet = isPart2 ? monkeys1 : monkeys2
  const maxWorryLevel = isPart2 ? calculateMaxWorryLevel(monkeysSet) : 1
  for (let round = 1; round <= ROUNDS; round++) {
    for (let monkeyId = 0; monkeyId < monkeysSet.size; monkeyId++) {
      const monkey = monkeysSet.get(monkeyId)
      if (monkey.items.length === 0) continue
      let originalItems = [...monkey.items]
      for (const item of originalItems) {
        monkey.inspectionCounter += 1
        let worryLevel = item
        let operationValue =
          monkey.operation[1] === 'old'
            ? item
            : Number(monkey.operation[1])
          
        switch(monkey.operation[0]) {
          case '+':
            worryLevel += operationValue
            break
          case '-':
            worryLevel -= operationValue
            break
          case '*':
            worryLevel *= operationValue
            break
          case '/':
            worryLevel /= operationValue
            break
        }

        worryLevel = isPart2 ? worryLevel % maxWorryLevel : Math.floor(worryLevel / 3)

        const isDivisibleBy = worryLevel % monkey.test === 0
        if (isDivisibleBy) {
          monkey.items.shift()
          const newMonkey = monkeysSet.get(monkey.ifTrue)
          newMonkey.items.push(worryLevel)
          monkeysSet.set(monkey.ifTrue, newMonkey)
        } else {
          monkey.items.shift()
          const newMonkey = monkeysSet.get(monkey.ifFalse)
          newMonkey.items.push(worryLevel)
          monkeysSet.set(monkey.ifFalse, newMonkey)
        }
      }
    }
    for (let i  = 0; i < monkeysSet.size; i++) {
    }
  }

  const monkeysArr = Array(...monkeysSet).map(x => {
    return {
      id: x[0],
      ...x[1],
    }
  }).sort((a, b) => b.inspectionCounter - a.inspectionCounter).slice(0,2)

  return monkeysArr[0].inspectionCounter * monkeysArr[1].inspectionCounter
}

const p1start = performance.now()
const p1 = solve(20, false)
const p1end = performance.now()

const p2start = performance.now()
const p2 = solve(10000, true)
const p2end = performance.now()

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(2022, day, {p1, p2})