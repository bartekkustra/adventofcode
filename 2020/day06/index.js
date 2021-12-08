import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).replace(/\r/g, '').split('\n\n')

const uniqueValue = (value, index, self) => self.indexOf(value) === index;

const part1 = () => {
  let counter = 0
  let p1input = [...input]
  p1input = p1input.map(x => x.replace(/\n/g, '').split(''))
  p1input.forEach(person => {
    let answersArray = new Set()
    person
      .map(letter => answersArray.add(letter))
    counter += answersArray.size
  });
  return counter
}

const part2 = () => {
  let answersMap = new Map()
  input.forEach((group, index) => {
    answersMap.set(index, group.split('\n'))
  });

  let totalUniqueTrueAnswers = 0;

  answersMap.forEach((group) => {
    let uniqueTrueAnswers = [];
    const uniqueAnswers = group.join("").split("").filter(uniqueValue);
    uniqueAnswers.forEach((letter, index) => {
      let isUnique = true;
      for (let i = 0; i < group.length; i++) {
        isUnique = isUnique && group[i].indexOf(letter) > -1;
      }
      if (isUnique) {
        uniqueTrueAnswers.push(letter);
      }
    });

    totalUniqueTrueAnswers += uniqueTrueAnswers.filter(uniqueValue).length;
  });
  return totalUniqueTrueAnswers;
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