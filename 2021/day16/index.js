import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.sample2`

const hex2bin = hex => ('0000' + (parseInt(hex, 16)).toString(2)).substr(-4)
const bin2dec = bin => parseInt(bin, 2)
const parsingStart = performance.now()

let inputHex = importFile(dir, filename)
let input = ''
for(let i = 0; i < inputHex.length; i++) {
  input += hex2bin(inputHex[i])
}
const parsingStop = performance.now()

const parsePacket = (packet) => {
  const version = bin2dec(packet.slice(0, 3))
  const typeId = bin2dec(packet.slice(3, 6))
  packet = packet.slice(6)
  
  if (typeId === 4) {
    let groups = []
    let pos = 0
    while(true) {
      if (pos > packet.length) break
      const group = packet.slice(pos+1, pos+5)
      groups.push(group)
      if (packet[pos] === '1') {
        pos += 5
      } else {
        break
      }
    }
    const value = bin2dec(groups.join(''))
    console.log(value)
  } else {
    console.log('not literal value')
    let pos = 0
    const lengthTypeId = packet[pos]
    let lengthOfSubpackets;
    let groups = []
    
    if (lengthTypeId === '0') {
      pos++
      lengthOfSubpackets = bin2dec(packet.slice(pos, pos + 15))
      pos += 15
      console.log({lengthOfSubpackets})
    } else {
      console.log('11 bits')
    }    
  }
  console.log({version, typeId})
}



const part1 = () => {
  parsePacket(input)
  return 0
}

const part2 = () => {
  
  return 0
}

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p2start = performance.now()
const p2 = part2()
const p2end = performance.now()

const parsingTime = (parsingStop - parsingStart).toFixed(3)
const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`parsing input: ${parsingTime}ms`)
console.log('--------')
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

// updateTimes(p1time, p2time, dir)
// updateMainBadge(2021, day, {p1, p2})