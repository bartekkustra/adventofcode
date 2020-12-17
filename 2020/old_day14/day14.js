console.clear()

console.log('--- JAVASCRIPT ---')

let input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`.split('\n')


const byte2Dec = (data) => {
  const bigInt = BigInt(`0b${data}`)
  return bigInt
}
const part1 = () => {
  let mem = []
  mask0 = 0
  mask1 = 0

  input.forEach((row, index) => {
    if (row.startsWith('mask = ')) {
      mask0 = byte2Dec(row.replace('mask = ', '').replace(/[1]/g, 'X').replace(/[0]/g, '1').replace(/[X]/g, '0'))
      mask1 = byte2Dec(row.replace('mask = ', '').replace(/[0]/g, 'X').replace(/[X]/g, '0'))
    } else {
      let [_, memIndex, memValue] = row.match(/mem\[(\d{1,})\] = (\d{1,})/)
      memValue = BigInt(memValue)
      memValue &= ~mask0
      memValue |= mask1
      mem[memIndex] = memValue
    }
  })
  return mem
}

const part2 = () => {
  const dec2bin = dec => (dec >>> 0).toString(2)

  let mem = []
  let mask = ''
  let mask0 = 0
  let mask1 = 0
  let maskX = 0
  let countX = 0
  let addr;
  
  input.forEach((row, index) => {
    if (row.startsWith('mask = ')) {
      row = row.replace('mask = ', '')
      mask = row
      mask0 = byte2Dec(row.replace(/[1]/g, 'X').replace(/[0]/g, '1').replace(/[X]/g, '0'))
      mask1 = byte2Dec(row.replace(/[0]/g, 'X').replace(/[X]/g, '0'))
      maskX = byte2Dec(row.replace(/[1]/g, '0').replace(/[0]/g, '0').replace(/[X]/g, '1'))
      countX = row.split('').filter(char => char === 'X')
    } else {
      let [_, memIndex, memValue] = row.match(/mem\[(\d{1,})\] = (\d{1,})/)
      memIndex = BigInt(memIndex)
      memValue = BigInt(memValue)

      memIndex = (memIndex & ~maskX) | mask1

      for(let i = 0; i < countX.length; i++) {
        const lengthOfArray = 2**countX[i].length
        console.log('-----')
        for(let j = 0; j < lengthOfArray; j++) {
          let finalArr = []
          const value = dec2bin(j).split('')
          for(let k = 0; k < countX[i] - value.length; k++) {
            finalArr.push('0')
          }
          value.forEach(sign => {
            finalArr.push(sign)
          });
        
          v = mask.split('')
          finalArr.forEach((j, i) => {
            v[countX[i]] = j
          })
          addr = BigInt([''].join(v), 2) | memIndex
          mem[addr] = memValue
        }
      }
    }
  })
  

  return mem
}

// console.log('------ TASK 1 ------')
const task1 = part1().reduce((curr, prev) => curr + prev)
console.log(task1)
console.log(parseInt(task1, 10))
// console.log('------- END1 -------\n')

// console.log('------ TASK 2 ------')
// const task2 = part2().reduce((curr, prev) => curr + prev)
// console.log(task2)
// console.log('------- END2 -------\n')