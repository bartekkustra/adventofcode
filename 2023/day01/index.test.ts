import { LATEST_YEAR, getDay } from '../../utils'
import { parsedInput, part1, part2 } from './index'

const TODAY = `${LATEST_YEAR}/${getDay(__dirname)}`

const SAMPLE_RESULTS = {
  part1: 142,
  part2: 281,
}

describe(TODAY, () => {
  it('part1', () => {
    const result = part1(parsedInput('sample'))
    expect(result).toBe(SAMPLE_RESULTS.part1)
  })
  it('part2', () => {
    const result = part2(parsedInput('sample2'))
    expect(result).toBe(SAMPLE_RESULTS.part2)
  })
})

describe(`${TODAY} - utils`, () => {})