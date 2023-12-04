import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()
console.log('-'.repeat(10), '\n'.repeat(2))

const year = 2023
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

interface Game {
  id: number
  // sets: GameSet[]
  sets: any[]
}

interface GameSet {
  red?: number
  green?: number
  blue?: number
}

type Colors = 'red' | 'green' | 'blue'

export const parsedInput = (ext?: string): any[] => importFile(filename + '.' + ext)
  .split('\n')
  .map(game => {
    const [gameIdString, setsString] = game.split(': ')
    const [_, gameId]: any|number = gameIdString.split(' ')
    let sets: any[] = []
    const setsArr = setsString.split('; ').map(pulls => {
      const obj: any = {}
      const pull = pulls.split(', ').map(cube => {
        const [count, color] = cube.split(' ')
        return [count, color]
      })
      for (const piece of pull) {
        obj[piece[1]] = Number(piece[0])
      }
      return obj
    })

    return {
      id: Number(gameId),
      sets: setsArr,
    }
  })

const isWithinBounds = (set: GameSet, key: Colors) => set[key] <= MAX_CUBES[key]

const MAX_CUBES: any = {
  red: 12,
  green: 13,
  blue: 14,
}

let setsFlag: boolean = true

export const part1 = (input: Game[]): number => {
  let sumOfIds = 0
  for (const game of input) {
    setsFlag = true
    for (const set of game.sets) {
      Object.keys(set).forEach((key: string) => {
        const withinBounds = isWithinBounds(set, key as Colors)
        if (!withinBounds) {
          setsFlag = false
          return
        }
      })
    }
    if (setsFlag) sumOfIds += game.id
  }

  return sumOfIds
}

export const part2 = (input: Game[]): number => {
  
  return 0
}

const main = () => {
  const p0start = performance.now()
  const p0 = parsedInput('in')
  const p0end = performance.now()

  const p1start = performance.now()
  const p1 = part1(parsedInput('in'))
  const p1end = performance.now()
  
  // const p2start = performance.now()
  // const p2 = part2(parsedInput('sample'))
  // const p2end = performance.now()
  
  const p0time = (p0end - p0start).toFixed(3)
  const p1time = (p1end - p1start).toFixed(3)
  // const p2time = (p2end - p2start).toFixed(3)
  console.log(`input: ${p0time}ms`)
  console.log('---')
  console.log(`part1: ${p1time}ms`)
  console.log('part1', p1)
  // console.log(`part2: ${p2time}ms`)
  // console.log('part2', p2)
  
  // updateTimes(p1time, p2time, dir)
  // updateMainBadge(year, day, {p1, p2})
}

if (require.main === module) {
  main()
}
