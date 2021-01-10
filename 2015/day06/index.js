import md5 from 'md5'
import { importFile } from '../../utils/index.mjs'

const day = '06'
const dir = `2015/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename)
  .replace(/\r/g, '')
  .split('\n')

console.clear()

const size = 10
const lightsRow = new Array(size).fill(new Array(size).fill(false))

const parseInstruction = (instruction) => {
  const {decision, from, to} = instruction.match(/(?<decision>turn on|turn off|toggle) (?<from>\d,\d) through (?<to>\d,\d)/).groups
  const [fromX, fromY] = from.split(',').map(Number)
  const [toX, toY] = to.split(',').map(Number)
  console.log(instruction)
  // console.log({fromX, toX, fromY, toY})
  for(let x = fromX; x <= toX; x++) {
    for(let y = fromY; y <= toY; y++) {
      switch(decision) {
        case 'turn on':
          lightsRow[x][y] = true
          break
        case 'turn off':
          lightsRow[x][y] = false
          break
        case 'toggle':
          const lights = lightsRow[x][y]
          console.log({x, y, lights})
          lightsRow[x][y] = !lights
          break
        default:
          throw new Error(`Incorrect decision: "${decision}"`)
      }
    }
  }
  console.table(lightsRow)
}

const part1 = () => {
  console.log(input)
  console.table(lightsRow)
  
  input.forEach(line => {
    parseInstruction(line)
  })
  
  console.table(lightsRow)

  return 0
}

const part2 = () => {

  return 0
}

console.time('part1')
const p1 = part1()
console.timeEnd('part1')
console.log(p1)

console.time('part2')
const p2 = part2()
console.timeEnd('part2')
console.log(p2)
