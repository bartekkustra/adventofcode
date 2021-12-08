console.clear()

console.log('-----------------------')
console.log('-------- START --------')
console.log('-----------------------\n')

// input
let [_, busIds] = `939
7,13,x,x,59,x,31,19`.split('\n')
busIds = busIds.split(',').map(el => {
  if(el !== 'x') {
    return parseInt(el, 10)
  }
  return el
})

// solution
const part2 = () => {
  const buses = busIds
    .map((busId, index) => ({
      id: busId,
      index: index,
    }))
    .filter((busId) => busId.id !== 'x')
    .map((busId) => ({
      ...busId,
      id: parseInt(busId.id, 10)
    }))
  // console.log(buses)
  // buses = [
  //   { id: 17, index: 0 },
  //   { id: 13, index: 2 },
  //   { id: 19, index: 3 }
  // ]

  let increment = buses[0].id
  let i = increment
  let nextBusIndex = 1

  while(true) {
    const valid = buses.every(busId => (i + busId.index) % busId.id === 0);

    if (valid) return `result: ${i}`

    const nextBus = buses[nextBusIndex]

    if((i + nextBus.index) % nextBus.id === 0) {
      increment *= nextBus.id
      nextBusIndex++
    }

    i += increment
  }
}

console.time('part2')
console.log(part2())
console.timeEnd('part2')


console.log('-----------------------')
console.log('--------- END ---------')
console.log('-----------------------\n')