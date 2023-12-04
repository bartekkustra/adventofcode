import { LATEST_YEAR, getDay } from '../../utils'
import { parsedInput, part1, part2 } from './index'

const TODAY = `${LATEST_YEAR}/${getDay(__dirname)}`

const SAMPLE_RESULTS = {
  part1: 0,
  part2: 0,
}

describe(TODAY, () => {
  it('part1', () => {
    const result = part1(parsedInput)
    expect(result).toBe(SAMPLE_RESULTS.part1)
  })
  it('part2', () => {
    const result = part2(parsedInput)
    expect(result).toBe(SAMPLE_RESULTS.part2)
  })
})

describe(`${TODAY} - utils`, () => {})