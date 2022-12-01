import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

// const LOG = true
const LOG = false
const SAMPLE_ID = 1

const day = getDay(import.meta.url)
const dir = `2021/day${day}`
const filename = `${day}.sample`

const hex2bin = hex => ('0000' + (parseInt(hex, 16)).toString(2)).substr(-4)
const bin2dec = bin => parseInt(bin, 2)

const createTree = (nodes, parentId) => {
  return nodes
    .filter(node => node.parent_id === parentId)
    .reduce((tree, node) => [
      ...tree,
      {
        ...node,
        children:createTree(nodes, node.id)
      }
    ], [])
}

/* obj struct => tree struct
  [
    {
      id: 1,
      parent_id: null,
    },
    {
      id: 2,
      parent_id: 1,
    },
    {
      id: 3,
      parent_id: 1,
    },
    {
      id: 4,
      parent_id: 3,
    },
  ]

  =>

  [
    {
      id: 1,
      parent_id: null,
      children: [
        {
          id: 2,
          parent_id: 1,
          children: []
        },
        {
          id: 3,
          parent_id: 1,
          children: [
            {
              id: 4,
              parent_id: 3,
              children: []
            }
          ]
        }
      ]
    }
  ]
*/

const parsingStart = performance.now()

const input = importFile(dir, filename).split('\n').map(x => x.replace('\r', '')).map(x => {
  let _input = ''
  for (let i = 0; i < x.length; i++) {
    _input += hex2bin(x[i])
  }
  while(_input[_input.length - 1] === '0') {
    _input = _input.slice(0, -1)
  }
  return {
    hex: x,
    bin: _input
  }
})

const parsingStop = performance.now()

let packetsArray = []
let packetId = 0

const parsePacket = (packet, parentId) => {
  console.log(packet)
  debugger;
  const currentPacketId = ++packetId
  let tempPacket = packet
  let data = {
    id: currentPacketId,
    parent_id: parentId,
  }
  
  const packetVersion = bin2dec(packet.slice(0, 3))
  packet = packet.slice(3)
  const packetTypeId = bin2dec(packet.slice(0, 3))
  packet = packet.slice(3)

  data.version = packetVersion
  data.typeId = packetTypeId

  while(packet.length % 5 !== 0) {
    packet += '0'
  }

  if (packetTypeId === 4) {
    let count = 0
    let literalValue = ''

    while (true) {
      count++
      const group = packet.slice(1, 5)
      packet = packet.slice(5)
      literalValue += group      
      if (packet.length === 0 || packet[0] === '0') {
        break
      }
    }
    literalValue = bin2dec(literalValue)
    data.value = literalValue
    packetsArray.push(data)
    packet = tempPacket.slice(count*5)
  }

  if (packetTypeId !== 4) {
    const lengthTypeId = packet.slice(0, 1)
    packet = packet.slice(1)
    
    let packetsLength = null
    if (lengthTypeId === '0') {
      packetsLength = 15
    }
    if (lengthTypeId === '1') {
      packetsLength = 11
    }

    const packetLengthValue = bin2dec(packet.slice(0, packetsLength))
    packet = packet.slice(packetsLength)
    packetsArray.push(data)

    packet = packet.slice(0, packetLengthValue)

    while(packet.length >= 12) {
      packet = parsePacket(packet, currentPacketId)
    }
  }
  
  return packet
}

const part1 = () => {
  const current = input[SAMPLE_ID]
  console.log(current, '\n')
  const parsed = parsePacket(current.bin, null)
  console.log({packetsArray})
  const tree = createTree(packetsArray, null)
  console.dir({tree}, {depth: null})
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

console.log('--------')
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