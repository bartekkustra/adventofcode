const utils = require('../utils')
// funcs
const isBetween = (value, arr) => (value >= arr[0][0] && value <= arr[0][1]) || (value >= arr[1][0] && value <= arr[1][1])

// input parser
const filename = '16.in'
let input = utils.importFile(filename)
  .replace(/\r/g, '')
  .split('\n\n')
  .map(line => line.split('\n'))
const rulesSplitter = input[0].map(el => el.split(': '))
let rules = new Map()
rulesSplitter.forEach(el => {
  rules.set(el[0], el[1].split(' or ').map(x => x.split('-').map(y => parseInt(y, 10))))
})

const myTicket = input[1][1].split(',').map(x => parseInt(x, 10))
input[2].shift()

const nearbyMap = new Map()
const nearbyTickets = input[2].map((el, index) => {
  nearbyMap.set(index, el.split(',').map(el => parseInt(el, 10)))
})

// invalidTickets finder
let invalidTicketsIndexes = new Set()
let i = 0
nearbyMap.forEach((tickets, i) => {
  let rulesValidity = true
  tickets.forEach((ticket, ticketIndex) => {
    let ticketValidity = false
    rules.forEach((value, key) => {
      ticketValidity |= isBetween(ticket, value)
    })
    rulesValidity &= ticketValidity
  })
  if(!rulesValidity) {
    nearbyMap.delete(i)
  }
})

// columns solver
let nearbyArr = []
nearbyArr.push(myTicket)
nearbyMap.forEach(ticket => nearbyArr.push(ticket))

let resultsMap = new Map()
let solvedMap = new Map()

for(let a = 0; a < 11; a++) {
  rules.forEach((value, key) => {
    let onlyOneTrue = []
    for(let col = 0; col < nearbyArr[0].length; col++) {
      if(!solvedMap.has(col)) {
        let allTrue = true
        for(let row = 0; row < nearbyArr.length; row++) {
          const isValid = isBetween(nearbyArr[row][col], value)
          allTrue &= isValid
        }
        onlyOneTrue.push({col, allTrue})
      }
    }
    const howManyAreTrue = onlyOneTrue.filter(x => x.allTrue === 1)

    if(howManyAreTrue.length === 1) {
      solvedMap.set(howManyAreTrue[0].col, key)
      rules.delete(key)
    }
  })
}

console.log(solvedMap)

let finalPart2 = 1
solvedMap.forEach((value, key) => {
  if(value.startsWith('departure')) {
    finalPart2 *= myTicket[key]
  }
})

console.log('FINAL', finalPart2)
