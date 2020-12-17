import { importFile } from '../../utils/index.mjs'

const day = '02'
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

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')