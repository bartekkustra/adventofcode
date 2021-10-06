console.clear()

const input = [5, 7, 1, 1, 2, 3, 22, 23, 24, 26]
// const input = [1, 2, 5]

const nonConstructibleChange = (coins) => {
  coins.sort((a, b) => a - b)
  const sumOfAll = coins.reduce((prev, curr) => prev + curr)
  console.log('max sum:', sumOfAll)
  console.log('coins', coins.join(', '), '\n')
  
  let change = 0
  let minReturn = 0
  coins.map((coin, index) => {
    if(coin > change + 1) {
      minReturn = change + 1
    }
    change += coin
  })
  if(minReturn === 0) {
    return sumOfAll + 1
  }
  return minReturn

}

const res = nonConstructibleChange(input)
console.log(res)