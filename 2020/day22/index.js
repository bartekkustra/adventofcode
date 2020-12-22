import { importFile } from '../../utils/index.mjs'
import _ from 'lodash'

console.clear()

const day = '22'
const dir = `2020/day${day}`
const filename = `${day}.sample`

let players = new Map()
let input = 
  importFile(dir, filename)
    .replace(/\r/g, '')
    .split('\n\n')
    .map(x => {
      x = x.split('\n')
      players.set(x[0].replace(':', ''), x.slice(1).map(y => parseInt(y, 10)))
    })

/**
 * @name dealCards
 * @description deals cards from the top and updates
 * 'players' map
 * @param {Map<String, Array>} playersMap map of players and cards
 * 
 * @returns {boolean} has someone won?
 */
const dealCards = (playersMap) => {
  let player1cards = playersMap.get('Player 1')
  let player2cards = playersMap.get('Player 2')
  if (player1cards[0] > player2cards[0]) {
    player1cards.push(player1cards[0], player2cards[0])
  } else if (player1cards[0] < player2cards[0]) {
    player2cards.push(player2cards[0], player1cards[0])
  } else {
    player1cards.push(player1cards[0])
    player2cards.push(player2cards[0])
  }
  player1cards.shift()
  player2cards.shift()
  playersMap.set('Player 1', player1cards)
  playersMap.set('Player 2', player2cards)
  
  if(player1cards.length === 0 || player2cards.length === 0) return false
  return true
}

const part1 = () => {
  let GAME1_players = _.cloneDeep(players)
  let deal = true
  while(deal) {
    deal = dealCards(GAME1_players)
  }

  let winningPlayer;
  GAME1_players.forEach((cards, name) => {
    if(cards.length !== 0) winningPlayer = name
  })
  
  const winningCards = GAME1_players.get(winningPlayer)
  let sum = 0
  for(let i = 0; i < winningCards.length; i++) {
    sum += winningCards[i] * (winningCards.length - i)
  }
  return sum
}

const part2 = () => {
  console.log('\n\n—————————— PART 2 ——————————')
  console.log('       expecting 291')
  console.log('————————————————————————————\n\n')

  let GAME2_players = _.cloneDeep(players)
  console.log(GAME2_players)

  let previousRounds = new Map() // Map<Number, Map<String, Array>>
  let i = 0
  if (previousRounds.has(i - 1)) {
    const prev = previousRounds.get(i-1)
    const curr = previousRounds.get(i)
    console.log(_.isEqual(prev, curr))
  }
}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')