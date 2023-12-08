import { getDay, importFile, updateMainBadge, updateTimes } from '../../utils/index'

import { performance } from 'perf_hooks'

console.clear()

const year = 2023
const day = getDay(__dirname)
const dir = `${year}/day${day}`
const filename = `${dir}/${day}`

type Input = any

interface StartEnd {
  start: number,
  end: number,
}

interface Schema {
  source: StartEnd
  destination: StartEnd
}

const mapSourceAndDestination = (_source: number, _destination: number, _range: number): Schema => {
  const source = {
    start: _source,
    end: _source + _range - 1
  }
  const destination = {
    start: _destination,
    end: _destination + _range - 1
  }
  return { source, destination }
}

const isWithinBounds = (start: number, end: number, value: number) => value >= start && value <= end

const getId = (arr: Schema[], id: number): number => {
  const matchingId = arr.find(x => isWithinBounds(x.source.start, x.source.end, id))
  if (matchingId) {
    const res = id - matchingId.source.start + matchingId.destination.start
    return res
  }
  return id
}

const getIdNew = (seedPair: number[], block: Schema[]): number => {
  /*
    let isOverlapped = false;
      for (const { source, destination } of block) {
        const overlapStart = Math.max(start, source.start);
        const overlapEnd = Math.min(end, destination.end);

        if (overlapStart < overlapEnd) {
          isOverlapped = true;
          newlist.push([overlapStart - source.start + destination.start, overlapEnd - source.start + destination.start]);
          if (overlapStart > start) seedsPairs.push([start, overlapStart]);
          if (end > overlapEnd) seedsPairs.push([overlapEnd, end]);
          break;
        }
      }
  */
  let groups: number[] = []

  for (const { source, destination } of block) {
    let id: number
    console.log('\n -', {source, destination})
    const overlapStart = Math.max(source.start, seedPair[0])
    const overlapEnd = Math.min(source.end, seedPair[1])
    console.log(' -', {overlapStart, overlapEnd})

    /*
               +----------+
              |           |
         +---+---+   +---+---+
        |   30  |   |   70  |
       20      40  60      80
    */
    if (overlapStart <= overlapEnd) {
      if (overlapStart <= source.start) {
        id = Math.max(overlapStart, seedPair[0])
        groups.push(id)
      } else {
        id = overlapStart
        groups.push(id)
      }
    } else {
      id = 
      groups.push()
    }
  }
  
  return 0
}

export const parsedInput = (ext: string): Input => {
  let [_seeds, _seed2soil, _soil2fertilizer, _fertilizer2water, _water2light, _light2temperature, _temperature2humidity, _humidity2location] = 
    importFile(filename + '.' + ext)
      .split('\n\n')
      .map(x => x.split(':')[1])
      .map(x => x.split('\n').map(y => y.trim()).filter(Boolean).map(z => z.split(' ').map(Number)))

  const seeds = _seeds[0]
  const seed2soil = _seed2soil.map(x => mapSourceAndDestination(x[1], x[0], x[2]))
  const soil2fertilizer = _soil2fertilizer.map(x => mapSourceAndDestination(x[1], x[0], x[2]))
  const fertilizer2water = _fertilizer2water.map(x => mapSourceAndDestination(x[1], x[0], x[2]))
  const water2light = _water2light.map(x => mapSourceAndDestination(x[1], x[0], x[2]))
  const light2temperature = _light2temperature.map(x => mapSourceAndDestination(x[1], x[0], x[2]))
  const temperature2humidity = _temperature2humidity.map(x => mapSourceAndDestination(x[1], x[0], x[2]))
  const humidity2location = _humidity2location.map(x => mapSourceAndDestination(x[1], x[0], x[2]))

  return {
    seeds,
    seed2soil,
    soil2fertilizer,
    fertilizer2water,
    water2light,
    light2temperature,
    temperature2humidity,
    humidity2location,
  }
}

export const part1 = ({seeds, seed2soil, soil2fertilizer, fertilizer2water, water2light, light2temperature, temperature2humidity, humidity2location} : {
  seeds: number[],
  seed2soil: Schema[],
  soil2fertilizer: Schema[],
  fertilizer2water: Schema[],
  water2light: Schema[],
  light2temperature: Schema[],
  temperature2humidity: Schema[],
  humidity2location: Schema[],
}): number => {
  const lowest: number[] = []

  for (const seed of seeds) {
    // find soil id
    const location = 
      getId(
        humidity2location,
        getId(
          temperature2humidity,
          getId(
            light2temperature,
            getId(
              water2light,
              getId(
                fertilizer2water,
                getId(
                  soil2fertilizer,
                  getId(
                    seed2soil, seed
                  )
                )
              )
            )
          )
        )
      )
    lowest.push(location)
  }

  
  return Math.min(...lowest)
}

export const part2 = ({seeds, seed2soil, soil2fertilizer, fertilizer2water, water2light, light2temperature, temperature2humidity, humidity2location} : {
  seeds: number[],
  seed2soil: Schema[],
  soil2fertilizer: Schema[],
  fertilizer2water: Schema[],
  water2light: Schema[],
  light2temperature: Schema[],
  temperature2humidity: Schema[],
  humidity2location: Schema[],
}): number => {
  const lowest: number[] = []
  const seedPairs: number[][] = []

  for (let i = 0; i < seeds.length; i = i + 2) {
    seedPairs.push([seeds[i], seeds[i] + seeds[i + 1]])
  }

  getIdNew([30, 70], [
    { source: { start: 20, end: 40 }, destination: { start: 21, end: 41 }},
    { source: { start: 60, end: 80 }, destination: { start: 61, end: 81 }},
  ])

  console.log('.....')
  console.log(seedPairs[0])
  console.log(seed2soil)

  for (const seedPair of seedPairs) {
    // console.log('-'.repeat(10))
    // console.log({seedPair})
    // const soil = getIdNew(seedPair, seed2soil)
    // console.log({soil})
    // find soil id
    // const location = 
    //   getId(
    //     humidity2location,
    //     getId(
    //       temperature2humidity,
    //       getId(
    //         light2temperature,
    //         getId(
    //           water2light,
    //           getId(
    //             fertilizer2water,
    //             getId(
    //               soil2fertilizer,
    //               getId(
    //                 seed2soil, seed
    //               )
    //             )
    //           )
    //         )
    //       )
    //     )
    //   )
    // lowest.push(location)
  }

  
  return Math.min(...lowest)
}


const main = () => {
  const p0start = performance.now()
  const sample = parsedInput('sample')
  const input = parsedInput('in')
  const p0end = performance.now()

  const p1start = performance.now()
  const p1 = part1(input)
  const p1end = performance.now()
  
  const p2start = performance.now()
  const p2 = part2(sample)
  const p2end = performance.now()
  
  const p0time = (p0end - p0start).toFixed(3)
  const p1time = (p1end - p1start).toFixed(3)
  const p2time = (p2end - p2start).toFixed(3)
  console.log(`input: ${p0time}ms`)
  console.log('---')
  console.log(`part1: ${p1time}ms`)
  console.log('part1', p1)
  console.log(`part2: ${p2time}ms`)
  console.log('part2', p2)
  
  // updateTimes(p1time, p2time, dir)
  // updateMainBadge(year, day, {p1, p2})
}

if (require.main === module) {
  main()
}
