console.log('\n\n--------------------------------------------\n\n')
console.log('\n\n--------------------------------------------\n\n')

let input = `F10
R270`.split('\n')

const changeDirection = (_c, _d, _v) => {
  // _c -> currentDirection
  // _d -> newDirection
  // _v -> degrees (multiple of 90s)
  const directions = ['N', 'E', 'S', 'W']
  const cIndex = directions.indexOf(_c)
  let newIndex = cIndex
  const howManyTimes = _v / 90
  if(_d === 'R') newIndex += howManyTimes
  if(_d === 'L') newIndex -= howManyTimes
  if(newIndex < 0) newIndex += 4
  newIndex = (newIndex % 4)
  return directions[newIndex]
}

const rotateVertex = (direction, degrees, _ship, _waypoint) => {
  const relativeWaypoint = {
    x: _waypoint.x - _ship.x,
    y: _waypoint.y - _ship.y
  }
  if(direction === 'R') degrees = 0 - degrees
  const roundValue = number => Math.round(number * Math.pow(10, 4)) / Math.pow(10, 4)
  const sinDegrees = angle => roundValue(Math.sin(angle * Math.PI / 180))
  const cosDegrees = angle => roundValue(Math.cos(angle * Math.PI / 180))

  const newX = _ship.x + (_waypoint.x - _ship.x) * cosDegrees(degrees) - (_waypoint.y - _ship.y) * sinDegrees(degrees);
  const newY = _ship.y + (_waypoint.x - _ship.x) * sinDegrees(degrees) + (_waypoint.y - _ship.y) * cosDegrees(degrees);

  return {x: newX, y: newY}
}

const moveWaypointInDirection = (_d, _v) => {
  if(_d === 'N') waypoint.y += _v
  if(_d === 'S') waypoint.y -= _v
  if(_d === 'E') waypoint.x += _v
  if(_d === 'W') waypoint.x -= _v
}

const moveInDirection = (/*_d, _v*/_pos, _waypoint, _v) => {
  // part1:
  // if(_d === 'N') pos.y += _v
  // if(_d === 'S') pos.y -= _v
  // if(_d === 'E') pos.x += _v
  // if(_d === 'W') pos.x -= _v
  // 
  // part2:
  // 0 -> 10 = 10
  // -8 -> 10 = 12
  // 10 -> -4 = -14
  const relativeWaypoint = {
    x: _waypoint.x - _pos.x,
    y: _waypoint.y - _pos.y
  }
  pos.x += relativeWaypoint.x * _v
  pos.y += relativeWaypoint.y * _v
  waypoint.x = pos.x + relativeWaypoint.x
  waypoint.y = pos.y + relativeWaypoint.y
}

let currentDirection = 'E'
let pos = {x: 0, y: 0}
let waypoint = {x: 10, y: 1}

for(let i = 0; i < input.length; i++) {
  const match = input[i].match(/^([NSEWLRF]{1})(\d{1,})$/)
  match.shift()
  const d = match[0]
  const v = parseInt(match[1])
  // console.log('oldpos', {...pos}, {...waypoint}, `${d}${v}`)

  switch(d) {
    case 'N':
    case 'S':
    case 'E':
    case 'W':
      moveWaypointInDirection(d, v)
      break;
    case 'L':
      // part1:
      // currentDirection = changeDirection(currentDirection, 'L', v)
      // console.log(currentDirection)
      // 
      // part2:
      waypoint = rotateVertex('L', v, pos, waypoint)
      break;
      case 'R':
        // part1:
        // currentDirection = changeDirection(currentDirection, 'R', v)
        // console.log(currentDirection)
        // 
        // part2:
        waypoint = rotateVertex('R', v, pos, waypoint)
      break;
    case 'F':
      moveInDirection(pos, waypoint, v)
      break;
    default:
      throw new Error(`Incorrect direction, i:${i}, currentDirection: ${currentDirection}, newDirection: ${d}, value: ${v}`);
  }

  // console.log('newpos', {...pos}, {...waypoint}, '\n')
}

console.log('part1:', Math.abs(pos.x) + Math.abs(pos.y))