import { performance } from 'perf_hooks'
import { importFile, updateTimes, getDay, updateMainBadge } from '../../utils/index.mjs'

console.clear()

const day = getDay(import.meta.url)
const dir = `2020/day${day}`
const filename = `${day}.in`
let input = importFile(dir, filename)
  .replace(/\r/g, "")
  .split('\n\n')
  .map((item) => {
    let tempArr = [];
    item = item
      .replace(/\n/g, " ")
      .split(" ")
      .sort()
      .map((field) => {
        const fieldArr = field.split(":");
        tempArr.push(fieldArr);
      });
    const entries = new Map(tempArr);
    const obj = Object.fromEntries(entries);
    return obj;
  });

const isBetween = (value, min, max) => value >= min && value <= max;

const part1 = () => {
  let validPassports = 0;

  // solution
  input.forEach((passport) => {
    const length = Object.keys(passport).length;
    if (length === 8) {
      validPassports++;
    }
    if (length === 7) {
      // check if it's `cid` that's missing
      if (passport.cid === undefined) validPassports++;
    }
  });

  return validPassports;
}

const part2 = () => {
  let validPassports = 0;

  // solution
  input.forEach(({byr, iyr, eyr, hgt, hcl, ecl, pid}) => {
    if (!(byr && byr.toString().length === 4 && isBetween(byr, 1920, 2002))) return;

    if (!(iyr && iyr.toString().length === 4 && isBetween(iyr, 2010, 2020))) return;

    if (!(eyr && eyr.toString().length === 4 && isBetween(eyr, 2020, 2030))) return;

    if (hgt) {
      let hgtArr = hgt.match(/(\d{2,3})([A-Za-z]{2})/) || [];
      if (hgtArr === null || hgtArr === []) return;
      const validHeight =
        (isBetween(hgtArr[1], 150, 193) && hgtArr[2] === "cm") ||
        (isBetween(hgtArr[1], 59, 76) && hgtArr[2] === "in");
      if (!validHeight) return;
    } else {
      return;
    }

    if (hcl) {
      let hclArr = hcl.match(/^(#[a-f0-9]{6})$/g);
      // console.log("#123123123".match(/\d{6}/))
      if (hclArr == null) return;
    } else {
      return;
    }

    if (ecl) {
      let eclArr = ecl.match(/(amb|blu|brn|gry|grn|hzl|oth)/);
      if (eclArr == null) return;
    } else {
      return;
    }

    if (pid) {
      let pidArr = pid.match(/^([0-9]{9})$/);
      if (pidArr == null) return;

    } else {
      return;
    }

    validPassports++;
  });

  return validPassports;
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