import { importFile } from '../../utils/index.mjs'

console.clear()

const day = '06'
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename).split('\n\n')

const uniqueValue = (value, index, self) => self.indexOf(value) === index;

const part1 = () => {
  let counter = 0
  input.forEach(person => {
    let answersArray = new Set()
    person
      .replace(/\n/g, '')
      .split('')
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

console.time('part1')
console.log('part1:', part1())
console.timeEnd('part1')

console.time('part2')
console.log('part2:', part2())
console.timeEnd('part2')
