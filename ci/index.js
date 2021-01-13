import { importFile } from '../utils/index.mjs'

console.clear()

let allTests = new Map()

const findArraySplits = (map, howMany) => {
  let sortedMapArr = []
  map.forEach((value, key) => {
    sortedMapArr.push({filename: key, duration: value})
  })
  sortedMapArr.sort((a, b) => b.duration - a.duration)
  let newMap = new Map()
  sortedMapArr.forEach(el => {
    newMap.set(el.filename, el.duration)
  })

  let arrMap = new Map()
  let obj = new Map()
  for(let i = 0; i < howMany; i++) {
    obj.set(i, 0)
  }

  newMap.forEach((value, key) => {
    const lowestIndex = findLowestSumIndex(obj)
    const currentSum = obj.get(lowestIndex)
    if(arrMap.has(lowestIndex)) {
      let quickArr = arrMap.get(lowestIndex)
      quickArr.push({duration: value, filename: key})
      arrMap.set(lowestIndex.quickArr)
    } else {
      let quickArr = [{duration: value, filename: key}]
      arrMap.set(lowestIndex, quickArr)
    }
    obj.set(lowestIndex, currentSum + value)
  })
  arrMap.delete(undefined)

  return arrMap
}

const findLowestSumIndex = (map) => {
  let lowestIndex = 0;
  map.forEach((value, key) => {
    if(value < map.get(lowestIndex)) {
      lowestIndex = key
    }
  })
  return lowestIndex
}

const findBestShardsNumber = () => {
  let splitTimes = new Map()
  for(let i = 5; i <= 25; i++) {
    const finalMap = findArraySplits(allTests, i)
    let testTimesArr = []
    finalMap.forEach(mapElement => {
      let totalSum = 0
      mapElement.forEach(el => totalSum += el.duration)
      testTimesArr.push(totalSum)
    })
    splitTimes.set(i, testTimesArr)
  }
  // splitTimes.forEach((value, key) => {
  //   console.log(`--------- ${key} ---------`)
  //   value.forEach(el => console.log(`${el / 1000 / 60}`))
  //   console.log(`-------------------`)
  // })
  return splitTimes
}

const readJson = which => {
  const day = '00'
  const filename = `${which}.json`
  let input = importFile('ci/data', filename)
  let jsonInput = JSON.parse(input)
  const runs = jsonInput[0].runs

  runs.forEach(run => {
    const filename = run.spec.name.replace('entrypoints/designer/client/ui-tests/', '')
    const times = run.stats.duration
    allTests.set(filename, times)
  })
}

const minMaxDuration = (map) => {
  let diffArr = []
  map.forEach((durationArr, index) => {
    durationArr.sort((a, b) => a - b)
    const diff = durationArr[durationArr.length - 1] - durationArr[0]
    diffArr.push({index, diff})
  })
  diffArr.sort((a, b) => a.diff - b.diff)
  return diffArr
}

for(let i = 1; i <= 23; i++) {
  readJson(i)
}

// console.log(allTests)

const showTimes = true
// const showTimes = false
showTimes && console.time('app')
showTimes && console.time('findBestShardsNumber')
const bestTimes = findBestShardsNumber()
showTimes && console.timeEnd('findBestShardsNumber')
showTimes && console.time('minMaxDuration')
const bestSplit = minMaxDuration(bestTimes)
showTimes && console.timeEnd('minMaxDuration')
showTimes && console.time('finalShardsMap')
const bestSplitNumber = bestSplit[0].index
console.log(bestSplitNumber)
const finalShardsMap = findArraySplits(allTests, bestSplitNumber)
showTimes && console.timeEnd('finalShardsMap')
showTimes && console.timeEnd('app')
