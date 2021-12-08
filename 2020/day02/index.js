import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\n')

console.clear()

const regexp = new RegExp(/(\d{1,})-(\d{1,})\W([a-z]{1}): ([a-z]{1,})/);

const part1 = () => {
  let validPasswordsCounter = 0;

  input.forEach((line) => {
    let eachLine = line.match(regexp);
    eachLine.shift();

    const minQ = eachLine[0]
    const maxQ = eachLine[1]
    const whichChar = eachLine[2]
    const lineString = eachLine[3]

    const regexpCount = new RegExp(whichChar, "g");
    const count = lineString.match(regexpCount || []);
    const countLength = count ? count.length : 0
    if (countLength >= minQ && countLength <= maxQ)
      validPasswordsCounter++;
  });

  return validPasswordsCounter;
};

const part2 = () => {
  let validPasswordsCounter = 0;

  input.forEach((line) => {
    let firstBool = false;
    let secondBool = false;

    let eachLine = line.match(regexp);
    eachLine.shift();

    const firstPos = eachLine[0] - 1;
    const secondPos = eachLine[1] - 1;
    const whichChar = eachLine[2];
    const lineString = eachLine[3];

    if (lineString[firstPos] === whichChar) firstBool = true;
    if (lineString[secondPos] === whichChar) secondBool = true;
    if (firstBool ^ secondBool) validPasswordsCounter++;
  });

  return validPasswordsCounter;
};

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