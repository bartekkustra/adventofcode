console.clear()

import { importFile } from '../../utils/index.mjs'

const dir = '2020/day03'
const filename = '3.in'
let input = importFile(dir, filename).split('\r\n')

const walkAndCountTrees = (map, steps) => {
  let countTrees = 0
  let row = 0
  let col = 0
  while(row < map.length) {
    if(map[row][col] === '#') countTrees++
    row += steps.stepDown
    col += steps.stepRight
  }
  return countTrees
}

const generateMap = (input, steps) => {
  let myMap = []
  const howMuchWider = Math.ceil((steps.stepRight * input.length) / input[0].length)
  
  for(let row = 0; row < input.length; row++) {
    const currentRow = input[row]
    for(let times = 0; times < howMuchWider; times++) {
      input[row] += currentRow
    }
    myMap.push(input[row])
  }

  return myMap
}

const part1 = () => {
  const steps = {
    stepRight: 3,
    stepDown: 1,
  }

  // generate map
  const myMap = generateMap(input, steps)
  return walkAndCountTrees(myMap, steps)
}

const part2 = () => {
  const multiSteps = [
    { stepRight: 1, stepDown: 1, },
    { stepRight: 3, stepDown: 1, },
    { stepRight: 5, stepDown: 1, },
    { stepRight: 7, stepDown: 1, },
    { stepRight: 1, stepDown: 2, },
  ]

  let value = 1
  multiSteps.forEach(x => {
    const myMap = generateMap(input, x)
    value *= walkAndCountTrees(myMap, x)
  })

  return value
}


console.log('part1', part1())
console.log('part2', part2())