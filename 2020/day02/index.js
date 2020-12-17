import { importFile } from '../../utils/index.mjs'

const dir = '2020/day02'
const filename = '2.in'
let input = importFile(dir, filename).split('\n')

console.clear()

const regexp = new RegExp(/(\d{1,})-(\d{1,})\W([a-z]{1}): ([a-z]{1,})/);

const task1 = () => {
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

const task2 = () => {
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

console.log(task1())
console.log(task2())