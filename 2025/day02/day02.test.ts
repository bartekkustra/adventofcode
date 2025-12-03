import { getDay, importFile } from '../../utils'
import { parseInput, part1, part2 } from './day02'  // Will be updated by new-day.sh

const year = 2025  // Will be replaced by new-day.sh script
const day = getDay(__dirname)

// Expected results from sample input
const SAMPLE_RESULTS = {
  part1: 1227775554,  // Update with expected result from puzzle
  part2: 4174379265,  // Update with expected result from puzzle
}

describe(`${year}/day${day}`, () => {
  const dir = `${year}/day${day}`
  const sample = parseInput(importFile(`${dir}/sample.txt`))

  test('Part 1', () => {
    const result = part1(sample)
    expect(result).toBe(SAMPLE_RESULTS.part1)
  })

  test('Part 2', () => {
    const result = part2(sample)
    expect(result).toBe(SAMPLE_RESULTS.part2)
  })
})
