import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '23'
const dir = `2020/day${day}`
const filename = `${day}.sample`
let input = importFile(dir, filename).replace(/\r/g, '').split('').map(x => parseInt(x))

console.log('-- START --')

const getDestination = (arr, three, max) => {
  let currValue = arr[0]
  while (true) {
    currValue -= 1
    if (currValue < 1) currValue = max
    if (!three.includes(currValue)) break
  }
  return currValue
}

const part1 = () => {
  let input1 = [...input]
  // game

  const MAX_ITEMS = 9

  for (let i = 1; i <= 10; i++) {
    const pickedUp = [input1[1], input1[2], input1[3]]
    const destination = getDestination(input1, pickedUp, MAX_ITEMS)
    const destinationIndex = input1.indexOf(destination)

    input1 = [].concat(input1.slice(4, destinationIndex + 1), ...pickedUp, input1.slice(destinationIndex + 1), input1[0])
  }

  const indexOfOne = input1.indexOf(1)
  let res = ''
  for(let i = 1; i < input1.length; i++) {
    res += input1[(i + indexOfOne) % input1.length]
  }
  return res
}


const part2 = () => {
  // input creator
  let input2 = [...input]
  const sortedInput = input.sort()
  const lowest = parseInt(sortedInput[0])
  let highest = parseInt(sortedInput[sortedInput.length - 1])
  
  const MAX_ITEMS = 1000000
  for (let i = highest + 1; i <= MAX_ITEMS; i++) {
    input2.push(i)
  }

  // game
  for (let i = 1; i <= 1000; i++) {
    const pickedUp = [input2[1], input2[2], input2[3]]
    const destination = getDestination(input2, pickedUp, MAX_ITEMS)
    const destinationIndex = input2.indexOf(destination)

    input2 = [].concat(input2.slice(4, destinationIndex + 1), ...pickedUp, input2.slice(destinationIndex + 1), input2[0]) // 1.158s @ 100   
  }
}

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')