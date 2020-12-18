import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '17'
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n')

const getNeighbours = (x, y, z, _map) => {
  // let results = new Map()
  let results = 0
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        if (i !== x || j !== y || k !== z) {
          const coords = [i, j, k].join(',')
          _map.has(coords) && _map.get(coords) && results++
        }
      }
    }
  }
  return results
}

const getNeighboursInHypercube = (x, y, z, w, _map) => {
  let results = 0
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        for (let l = w - 1; l <= w + 1; l++) {
          if (i !== x || j !== y || k !== z || l !== w) {
            const coords = [i, j, k, l].join(',')
            _map.has(coords) && _map.get(coords) && results++
          }
        }
      }
    }
  }
  return results
}

const part1 = () => {
  // 3d input
  let map = new Map()
  input.forEach((row, y) => {
    for(let x = 0; x < row.length; x++) {
      const active = row[x] === '#'
      const id = [x, y, 0].join(',')
      map.set(id, active)
    }
  })
  
  for (let cycle = 0; cycle < 6; cycle++) {
    const coords = map.keys()

    let minObj = {
      'x': null,
      'y': null,
      'z': null,
    }
    let maxObj = {
      'x': null,
      'y': null,
      'z': null,
    }
    let min = new Map(Object.entries(minObj))
    let max = new Map(Object.entries(maxObj))
    for (const key of coords) {
      const [x, y, z] = key.split(',').map(x => parseInt(x, 10))
      x < min.get('x') && min.set('x', x)
      y < min.get('y') && min.set('y', y)
      z < min.get('z') && min.set('z', z)
      x > max.get('x') && max.set('x', x)
      y > max.get('y') && max.set('y', y)
      z > max.get('z') && max.set('z', z)
    }

    const newState = new Map()
    for (let x = min.get('x') - 1; x <= max.get('x') + 1; x++) {
      for (let y = min.get('y') - 1; y <= max.get('y') + 1; y++) {
        for (let z = min.get('z') - 1; z <= max.get('z') + 1; z++) {
          const activeNeighbours = getNeighbours(x, y, z, map)
          const key = [x, y, z].join(',')
          const isActive = map.has(key) ? map.get(key) : false
          if(isActive && (activeNeighbours !== 2 && activeNeighbours !== 3)) {
            newState.set(key, false)
          } else if(!isActive && activeNeighbours === 3) {
            newState.set(key, true)
          } else {
            newState.set(key, isActive)
          }
        }
      }
    }
    map = newState
  }

  let sum = 0
  let cubes = map.values()
  for (const cube of cubes) {
    if (cube) sum++
  }
  return sum
}

const part2 = () => {
  // 4d input
  let map = new Map()
  input.forEach((row, y) => {
    for(let x = 0; x < row.length; x++) {
      const active = row[x] === '#'
      const id = [x, y, 0, 0].join(',')
      map.set(id, active)
    }
  })
  // iterate over 6 cycles
  
  for (let cycle = 0; cycle < 6; cycle++) {
    // console.time(`cycle${cycle}`)
    const coords = map.keys()
    let minObj = {
      'x': null,
      'y': null,
      'z': null,
      'w': null,
    }
    let maxObj = {
      'x': null,
      'y': null,
      'z': null,
      'w': null,
    }
    let min = new Map(Object.entries(minObj))
    let max = new Map(Object.entries(maxObj))
    for (const key of coords) {
      const [x, y, z, w] = key.split(',').map(x => parseInt(x, 10))
      if (x < min.get('x')) min.set('x', x)
      if (y < min.get('y')) min.set('y', y)
      if (z < min.get('z')) min.set('z', z)
      if (w < min.get('w')) min.set('w', w)
      if (x > max.get('x')) max.set('x', x)
      if (y > max.get('y')) max.set('y', y)
      if (z > max.get('z')) max.set('z', z)
      if (w > max.get('w')) max.set('w', w)
    }

    const newState = new Map()

    for (let x = min.get('x') - 1; x <= max.get('x') + 1; x++) {
      for (let y = min.get('y') - 1; y <= max.get('y') + 1; y++) {
        for (let z = min.get('z') - 1; z <= max.get('z') + 1; z++) {
          for (let w = min.get('w') - 1; w <= max.get('w') + 1; w++) {
            const activeNeighbours = getNeighboursInHypercube(x, y, z, w, map)
            const key = [x, y, z, w].join(',')
            const isActive = map.has(key) ? map.get(key) : false
            if(isActive && (activeNeighbours !== 2 && activeNeighbours !== 3)) {
              newState.set(key, false)
            } else if(!isActive && activeNeighbours === 3) {
              newState.set(key, true)
            } else {
              newState.set(key, isActive)
            }
          }
        }
      }
    }
    map = newState
    // console.timeEnd(`cycle${cycle}`)
  }

  let sum = 0
  let cubes = map.values()
  for (const cube of cubes) {
    if (cube) sum++
  }
  return sum
}

console.log('-------- START --------')
console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')