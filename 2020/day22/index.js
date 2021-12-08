import _ from 'lodash'
import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`

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
 * @description loops through cards and check which card is higher
 *              giving the winner both of the cards in order
 *              high to low
 * @param {Array<number>} p1 array of cards Player 1 has
 * @param {Array<number>} p2 array of cards Player 2 has
 * 
 * @returns {Array<number>} winning deck of cards
 */
const dealCards = (p1, p2) => {
  while(p1.length > 0 && p2.length > 0) {
    const p1card = p1.shift()
    const p2card = p2.shift()
  
    if (p1card > p2card) {
      // Player 1 wins
      p1.push(p1card)
      p1.push(p2card)
    } else {
      // Player 2 wins
      p2.push(p2card)
      p2.push(p1card)
    }
  }

  return p1.length > 0
    ? p1
    : p2
}

/**
 * @name recursiveRound
 * @description Deals cards based on set of rules and goes into
 *              a recursion with new set of cards (excluding those
 *              that were picked from the top)
 *
 * @param {Array<number>} p1
 * @param {Array<number>} p2
 * @return {winner: number, deck: Array<number>} returns an object
 *              that contains id of a winner as well as the winning
 *              deck of cards
 */
const recursiveRound = (p1, p2) => {
  let winner;
  let round = 0
  let previousGames = new Set()

  while(p1.length > 0 && p2.length > 0) {
    round++
    
    const gameState = `${p1.join(',')}#${p2.join(',')}`
    // console.log('previousGames', previousGames)
    // console.log(round, gameState)
    if(previousGames.has(gameState)) {
      return {winner: 1, deck: p1}
    }
    previousGames.add(gameState)
    
    const p1card = p1.shift()
    const p2card = p2.shift()
    // console.log('  ->', p1, p2)
    
    if(p1.length >= p1card && p2.length >= p2card) {
      const res = recursiveRound(p1.slice(0, p1card), p2.slice(0, p2card))
      winner = res.winner
    } else {
      winner = p1card > p2card ? 1 : 2
    }

    if(winner == 1) {
      p1.push(p1card)
      p1.push(p2card)
    } else {
      p2.push(p2card)
      p2.push(p1card)
    }
  }

  return {
    winner: p1.length > 0 ? 1 : 2,
    deck: p1.length > 0 ? p1 : p2
  }
}

const part1 = () => {
  let GAME1_players = _.cloneDeep(players)
  const winningDeck = dealCards(GAME1_players.get('Player 1'), GAME1_players.get('Player 2'))
  return winningDeck.reduce((prev, curr, index) => prev + (curr * (winningDeck.length - index)), 0)
}


const part2 = () => {
  let GAME2_players = _.cloneDeep(players)
  const winningData = recursiveRound(GAME2_players.get('Player 1'), GAME2_players.get('Player 2'))
  // console.log(deck)
  return winningData
    .deck
    .reduce(
      (prev, curr, index) => 
        prev + (curr * (winningData.deck.length - index)), 0)
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