import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n')

const getNeighbours = (x, y, z, _mySet) => {
  let results = 0
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        if (i !== x || j !== y || k !== z) {
          const coords = [i, j, k].join(',')
          _mySet.has(coords) && results++
        }
      }
    }
  }
  return results
}

const getNeighboursInHypercube = (x, y, z, w, _mySet) => {
  let results = 0
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        for (let l = w - 1; l <= w + 1; l++) {
          if (i !== x || j !== y || k !== z || l !== w) {
            const coords = [i, j, k, l].join(',')
            _mySet.has(coords) && results++
          }
        }
      }
    }
  }
  return results
}

const part1 = () => {
  // 3d input
  let mySet = new Set()
  input.forEach((row, y) => {
    for(let x = 0; x < row.length; x++) {
      const active = row[x] === '#'
      if (active) {
        const id = [x, y, 0].join(',')
        mySet.add(id)
      }
    }
  })
  
  for (let cycle = 0; cycle < 6; cycle++) {
    const coords = mySet

    let minObj = {
      'x': 0,
      'y': 0,
      'z': 0,
    }
    let maxObj = {
      'x': 0,
      'y': 0,
      'z': 0,
    }
    let min = new Map(Object.entries(minObj))
    let max = new Map(Object.entries(maxObj))
    for (const key of coords) {
      const [x, y, z] = key.split(',').map(x => parseInt(x, 10))
      x < min.get('x') ? min.set('x', x) : null
      y < min.get('y') ? min.set('y', y) : null
      z < min.get('z') ? min.set('z', z) : null
      x > max.get('x') ? max.set('x', x) : null
      y > max.get('y') ? max.set('y', y) : null
      z > max.get('z') ? max.set('z', z) : null
    }

    const newState = new Set([...mySet])
    for (let x = min.get('x') - 1; x <= max.get('x') + 1; x++) {
      for (let y = min.get('y') - 1; y <= max.get('y') + 1; y++) {
        for (let z = min.get('z') - 1; z <= max.get('z') + 1; z++) {
          const activeNeighbours = getNeighbours(x, y, z, mySet)
          const key = [x, y, z].join(',')
          const isActive = mySet.has(key)
          if (!(isActive && (activeNeighbours === 2 || activeNeighbours === 3))) {
            newState.delete(key)
          }

          if(!isActive && activeNeighbours === 3) {
            newState.add(key)
          }
        }
      }
    }
    mySet = newState
  }

  return mySet.size
}

const part2 = () => {
  // 4d input
  let mySet = new Set()
  input.forEach((row, y) => {
    for(let x = 0; x < row.length; x++) {
      const active = row[x] === '#'
      if (active) {
        const id = [x, y, 0, 0].join(',')
        mySet.add(id)
      }
    }
  })
  
  for (let cycle = 0; cycle < 6; cycle++) {
    const coords = mySet

    let minObj = {
      'x': 0,
      'y': 0,
      'z': 0,
      'w': 0,
    }
    let maxObj = {
      'x': 0,
      'y': 0,
      'z': 0,
      'w': 0,
    }
    let min = new Map(Object.entries(minObj))
    let max = new Map(Object.entries(maxObj))
    for (const key of coords) {
      const [x, y, z, w] = key.split(',').map(x => parseInt(x, 10))
      x < min.get('x') ? min.set('x', x) : null
      y < min.get('y') ? min.set('y', y) : null
      z < min.get('z') ? min.set('z', z) : null
      w < min.get('w') ? min.set('w', z) : null
      x > max.get('x') ? max.set('x', x) : null
      y > max.get('y') ? max.set('y', y) : null
      z > max.get('z') ? max.set('z', z) : null
      w > max.get('w') ? max.set('w', w) : null
    }

    const newState = new Set([...mySet])
    for (let x = min.get('x') - 1; x <= max.get('x') + 1; x++) {
      for (let y = min.get('y') - 1; y <= max.get('y') + 1; y++) {
        for (let z = min.get('z') - 1; z <= max.get('z') + 1; z++) {
          for (let w = min.get('w') - 1; w <= max.get('w') + 1; w++) {
            const activeNeighbours = getNeighboursInHypercube(x, y, z, w, mySet)
            const key = [x, y, z, w].join(',')
            const isActive = mySet.has(key)
            if (!(isActive && (activeNeighbours === 2 || activeNeighbours === 3))) {
              newState.delete(key)
            }

            if(!isActive && activeNeighbours === 3) {
              newState.add(key)
            }
          }
        }
      }
    }
    mySet = newState
  }

  return mySet.size
}

const p1start = performance.now()
const p1 = part1()
const p1end = performance.now()

const p2start = performance.now()
const p2 = part2()
const p2end = performance.now()

const p1time = (p1end - p1start).toFixed(3)
const p2time = (p2end - p2start).toFixed(3)
console.log(`part1: ${p1time}ms`)
console.log('part1', p1)
console.log(`part2: ${p2time}ms`)
console.log('part2', p2)

updateTimes(p1time, p2time, dir)
updateMainBadge(2020, day, {p1, p2})