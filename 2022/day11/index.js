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
    }
  })

const part1 = () => {
  const monkeys1 = new Map()
  let inp = JSON.parse(JSON.stringify(input))
  for (const monkey of inp) {
    monkeys1.set(monkey.monkey, {
      items: monkey.items,
      test: monkey.test,
      operation: monkey.operation,
      ifTrue: monkey.ifTrue,
      ifFalse: monkey.ifFalse,
      inspectionCounter: 0,
    })
  }

  const SHOULD_LOG = false
  const ROUNDS = 20
  for (let round = 1; round <= ROUNDS; round++) {
    SHOULD_LOG && console.log(`\n\n ROUND ${round}\n\n`)
    for (let monkeyId = 0; monkeyId < monkeys1.size; monkeyId++) {
      const monkey = monkeys1.get(monkeyId)
      if (monkey.items.length === 0) continue
      SHOULD_LOG && console.log(`Monkey ${monkeyId}:`)
      let originalItems = [...monkey.items]
      for (const item of originalItems) {
        monkey.inspectionCounter += 1
        SHOULD_LOG && console.log(`  Monkey inspects an item with a worry level of ${item}.`)
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
        SHOULD_LOG && console.log(`    Worry level is ${monkey.operation[0]} by ${operationValue} to ${worryLevel}`)

        worryLevel = Math.floor(worryLevel / 3)
        SHOULD_LOG && console.log(`    Monkey gets bored with item. Worry level is divided by 3 to ${worryLevel}`)

        const isDivisibleBy = worryLevel % monkey.test === 0
        if (isDivisibleBy) {
          SHOULD_LOG && console.log(`    Current worry level is divisible by ${monkey.test}.`)
          SHOULD_LOG && console.log(`    Item with worry level ${worryLevel} is thrown to monkey ${monkey.ifTrue}`)
          monkey.items.shift()
          const newMonkey = monkeys1.get(monkey.ifTrue)
          newMonkey.items.push(worryLevel)
          monkeys1.set(monkey.ifTrue, newMonkey)
        } else {
          SHOULD_LOG && console.log(`    Current worry level is not divisible by ${monkey.test}.`)
          SHOULD_LOG && console.log(`    Item with worry level ${worryLevel} is thrown to monkey ${monkey.ifFalse}`)
          monkey.items.shift()
          const newMonkey = monkeys1.get(monkey.ifFalse)
          newMonkey.items.push(worryLevel)
          monkeys1.set(monkey.ifFalse, newMonkey)
        }
      }
      SHOULD_LOG && console.log('\n')
    }
    SHOULD_LOG && console.log('\nAfter round ${round}:')
    for (let i  = 0; i < monkeys1.size; i++) {
      SHOULD_LOG && console.log(`Monkey ${i}: ${monkeys1.get(i).items.join(', ')}`)
    }
    SHOULD_LOG && console.log('\n')
  }

  const monkeysArr = Array(...monkeys1).map(x => {
    return {
      id: x[0],
      ...x[1],
    }
  }).sort((a, b) => b.inspectionCounter - a.inspectionCounter).slice(0,2)

  return monkeysArr[0].inspectionCounter * monkeysArr[1].inspectionCounter
}

const part2 = () => {
  const monkeys1 = new Map()
  let inp = JSON.parse(JSON.stringify(input))
  for (const monkey of inp) {
    monkeys1.set(monkey.monkey, {
      items: monkey.items,
      test: monkey.test,
      operation: monkey.operation,
      ifTrue: monkey.ifTrue,
      ifFalse: monkey.ifFalse,
      inspectionCounter: 0,
    })
  }

  let maxWorryLevel = 1
  monkeys1.forEach(monkey => {
    maxWorryLevel *= monkey.test
  })

  const SHOULD_LOG = false
  const ROUNDS = 10000
  for (let round = 1; round <= ROUNDS; round++) {
    SHOULD_LOG && console.log(`\n\n ROUND ${round}\n\n`)
    for (let monkeyId = 0; monkeyId < monkeys1.size; monkeyId++) {
      const monkey = monkeys1.get(monkeyId)
      if (monkey.items.length === 0) continue
      SHOULD_LOG && console.log(`Monkey ${monkeyId}:`)
      let originalItems = [...monkey.items]
      for (const item of originalItems) {
        monkey.inspectionCounter += 1
        SHOULD_LOG && console.log(`  Monkey inspects an item with a worry level of ${item}.`)
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
        SHOULD_LOG && console.log(`    Worry level is ${monkey.operation[0]} by ${operationValue} to ${worryLevel}`)

        worryLevel = worryLevel % maxWorryLevel
        SHOULD_LOG && console.log(`    Monkey gets bored with item. Worry level is divided by 3 to ${worryLevel}`)

        const isDivisibleBy = worryLevel % monkey.test === 0
        if (isDivisibleBy) {
          SHOULD_LOG && console.log(`    Current worry level is divisible by ${monkey.test}.`)
          SHOULD_LOG && console.log(`    Item with worry level ${worryLevel} is thrown to monkey ${monkey.ifTrue}`)
          monkey.items.shift()
          const newMonkey = monkeys1.get(monkey.ifTrue)
          newMonkey.items.push(worryLevel)
          monkeys1.set(monkey.ifTrue, newMonkey)
        } else {
          SHOULD_LOG && console.log(`    Current worry level is not divisible by ${monkey.test}.`)
          SHOULD_LOG && console.log(`    Item with worry level ${worryLevel} is thrown to monkey ${monkey.ifFalse}`)
          monkey.items.shift()
          const newMonkey = monkeys1.get(monkey.ifFalse)
          newMonkey.items.push(worryLevel)
          monkeys1.set(monkey.ifFalse, newMonkey)
        }
      }
      SHOULD_LOG && console.log('\n')
    }
    SHOULD_LOG && console.log('\nAfter round ${round}:')
    for (let i  = 0; i < monkeys1.size; i++) {
      SHOULD_LOG && console.log(`Monkey ${i}: ${monkeys1.get(i).items.join(', ')}`)
    }
    SHOULD_LOG && console.log('\n')
  }

  const monkeysArr = Array(...monkeys1).map(x => {
    return {
      id: x[0],
      ...x[1],
    }
  }).sort((a, b) => b.inspectionCounter - a.inspectionCounter).slice(0,2)

  return monkeysArr[0].inspectionCounter * monkeysArr[1].inspectionCounter
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
updateMainBadge(2022, day, {p1, p2})