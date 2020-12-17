console.clear()

const part1 = (input, times) => {
  console.time('generateInput')
  input = input.split(',').map(el => parseInt(el, 10))
  const memo = new Map()
  for(let i = 1; i <= input.length; i++) {
    memo.set(input[i-1], [i])
  }
  // console.log(memo)
  console.timeEnd('generateInput')
  
  const logStuff = false
  logStuff && console.log('\n-------------- TURNS ---------------')
  
  let lastNumberSpoken = input[input.length - 1]
  
  const sizeOfCheck = times
  
  console.time('EntireFor')
  for(let turn = input.length + 1; turn <= sizeOfCheck; turn++) {
    logStuff && console.time('EachTurn')
    let sayNumber = 0
    logStuff && console.log(`\nTurn ${turn}`)
    logStuff && console.log(`  Last number spoken: ${lastNumberSpoken}`)
    
    // if number hasn't been spoken before
    // create it in memo
    if(!memo.has(lastNumberSpoken)) {
      memo.set(lastNumberSpoken, [turn])
    }
    
    logStuff && console.log(memo)
    if(memo.get(lastNumberSpoken).length === 1) {
      sayNumber = 0
      if(!memo.has(sayNumber)) {
        memo.set(sayNumber, [turn])
      } else {
        let currentArr = memo.get(sayNumber)
        currentArr.push(turn)
        memo.set(sayNumber, currentArr)
      }
    } else {
      let turns = memo.get(lastNumberSpoken)
      if(turns.length > 2) {

        turns = [turns[turns.length - 2], turns[turns.length - 1]]
      }
      sayNumber = turns[turns.length - 1] - (turns[turns.length - 2] || 0)
      if(!memo.has(sayNumber)) {
        memo.set(sayNumber, [turn])
      } else {
        let currentArr = memo.get(sayNumber)
        currentArr.push(turn)
        memo.set(sayNumber, currentArr)
      }
    }

    lastNumberSpoken = sayNumber
    
    
    logStuff && console.log(memo)
    logStuff && console.log(`  saying: ${sayNumber}`)
    logStuff && console.timeEnd('EachTurn')
    // console.log(memo)
  }
  logStuff && console.log('memolength', Object.keys(memo).length)
  
  console.timeEnd('EntireFor')
  
  logStuff && console.log('\n------------------------------------\n')
  
  console.log(`input: ${input}\nlast number spoken: ${lastNumberSpoken}\n\n`)
}

part1('13,16,0,12,15,1', 30000000)
