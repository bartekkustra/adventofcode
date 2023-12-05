import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()

const year = 2023
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

interface Game {
  id: number
  sets: GameSet[]
}

type Colors = 'red' | 'green' | 'blue'
type GameSet = {
  [k in Colors]: number
}

const isWithinBounds = (set: GameSet, key: Colors): boolean => set[key] <= MAX_CUBES[key]

const MAX_CUBES: GameSet = {
  red: 12,
  green: 13,
  blue: 14,
}

export const parsedInput = (ext: string): Game[] => importFile(filename + '.' + ext)
  .split('\n')
  .map(game => {
    const [gameIdString, setsString] = game.split(': ')
    const gameId: number = Number(gameIdString.split(' ')[1])
    const setsArr: GameSet[] = setsString.split('; ').map((pulls: string) => {
      const obj: GameSet = {
        red: 0,
        green: 0,
        blue: 0,
      }
      pulls.split(', ').forEach(cube => {
        const [count, color] = cube.split(' ')
        obj[color as keyof GameSet] = Number(count)
      })
      return obj
    })

    return {
      id: gameId,
      sets: setsArr,
    }
  })

export const part1 = (input: Game[]): number =>
  input.reduce((sumOfIds, game) => {
    const setsFlag = game.sets.every(set => 
      Object.keys(set).every(key => isWithinBounds(set, key as Colors))
    )

    return setsFlag ? sumOfIds + game.id : sumOfIds
  }, 0)

export const part2 = (input: Game[]): number =>
  input.reduce((sumOfPowers, game) => {
    let lowest: any = {
      red: Number.MIN_SAFE_INTEGER,
      green: Number.MIN_SAFE_INTEGER,
      blue: Number.MIN_SAFE_INTEGER,
    }

    for (const set of game.sets) {
      Object.keys(set).forEach((key: string) => {
        lowest[key] = Math.max(lowest[key], set[key as Colors])
      })
    }

    const powerOfCubes: number = (Object.values(lowest) as number[]).reduce((a: number, b: number) => a * b, 1)
    return sumOfPowers + powerOfCubes
  }, 0)

const main = () => {
  const p0start = performance.now()
  // const sample: Game[] = parsedInput('sample')
  const input: Game[] = parsedInput('in')
  const p0end = performance.now()

  const p1start = performance.now()
  const p1 = part1(input)
  const p1end = performance.now()
  
  const p2start = performance.now()
  const p2 = part2(input)
  const p2end = performance.now()
  
  const p0time = (p0end - p0start).toFixed(3)
  const p1time = (p1end - p1start).toFixed(3)
  const p2time = (p2end - p2start).toFixed(3)
  console.log(`input: ${p0time}ms`)
  console.log('---')
  console.log(`part1: ${p1time}ms`)
  console.log('part1', p1)
  console.log(`part2: ${p2time}ms`)
  console.log('part2', p2)
  
  updateTimes(p1time, p2time, dir)
  updateMainBadge(year, day, {p1, p2})
}

if (require.main === module) {
  main()
}
