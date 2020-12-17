console.clear()

console.log('-----------------------')
console.log('-------- START --------')
console.log('-----------------------\n')

const sortByDiff = (a, b) => {
  if (a.diff > b.diff) return 1
  if (a.diff < b.diff) return -1
  return 0
}

let [_, buses] = `1002578
17,x,13,19`.split('\n')

buses = buses.split(',').map(el => {
  if(el !== 'x') {
    return parseInt(el, 10)
  }
  return el
})

let schedule = []
/*
  let schedule = [
    [timestamp, 0, 0, 0, 0, 0]
    [timestamp, 1, 0, 0, 0, 0]
    ...
    [timestamp, 0, 1, 0, 1, 0]
  ]
*/
const amountOfBuses = buses.length

const checkMin = 0
const checkMax = 3500

let shouldLoopContinue = true
let timestamp = 1
while(shouldLoopContinue) {
  // check
  let checkBusesBool = true
  if(timestamp > amountOfBuses) {
    // console.log('-------- CHECK --------')
    let checkArr = []
    for(let checkIndex = timestamp - 1 - amountOfBuses; checkIndex < schedule.length; checkIndex++) {
      checkArr.push(schedule[checkIndex])
    }
    // console.log(checkArr)
    for(let checkIndex = 0; checkIndex < checkArr.length; checkIndex++) {
      const currentValue = checkArr[checkIndex].buses[checkIndex]
      if(currentValue === '.') {
        checkBusesBool = false
        checkIndex = checkArr.length;
      }
    }
    if(checkBusesBool) {
      console.log('FOUND PATTERN')
      shouldLoopContinue = false
      console.log(checkArr[0], '->', checkArr[checkArr.length - 1])
    }

    // console.log('------ END CHECK ------')
  }

  // temp infiloop prevention
  if(timestamp > checkMax + 10) break
  let busesDepartures = []
  const currentTime = timestamp

  for(let busIndex = 0; busIndex < buses.length; busIndex++) {
    const busid = buses[busIndex]
    if(busid === 'x') {
      busesDepartures.push('x')
    } else {
      const doesBusDeparts = currentTime % busid === 0
      if(doesBusDeparts) {
        busesDepartures.push('D')
      } else {
        busesDepartures.push('.')
      }
    }
  }

  schedule.push({'timestamp': currentTime, 'buses': busesDepartures})

  timestamp++
}
console.log('-----------------------')
console.log('--------- END ---------')
console.log('-----------------------\n')
// for(let i = checkMin - 3; i < checkMax + 3; i++) {
//   console.log(schedule[i])
// }
for(let i = timestamp - amountOfBuses - 2; i < schedule.length - 1; i++) {
  console.log(schedule[i])
}