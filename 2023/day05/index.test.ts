import { LATEST_YEAR, getDay } from '../../utils'
import { parsedInput, part1, part2, getNextType } from './index'

const TODAY = `${LATEST_YEAR}/${getDay(__dirname)}`

const SAMPLE_RESULTS = {
  part1: 35,
  part2: 46,
}

describe(TODAY, () => {
  it('part1', () => {
    const result = part1(parsedInput('sample'))
    expect(result).toBe(SAMPLE_RESULTS.part1)
  })
  it('part2', () => {
    const result = part2(parsedInput('sample'))
    expect(result).toBe(SAMPLE_RESULTS.part2)
  })
})

describe(`${TODAY} - utils - getNextType`, () => {
  const mockConversionMap = new Map([
    ['test-conversion', [
      {
        destinationRangeStart: 50,
        sourceRangeStart: 98,
        rangeLength: 2,
      },
      {
        destinationRangeStart: 52,
        sourceRangeStart: 50,
        rangeLength: 48,
      },
    ]]
  ])

  it('should return same number when no range matches', () => {
    const result = getNextType('test-conversion', 14, mockConversionMap)
    expect(result).toBe(14)
  })
  
  it('should convert number within first range', () => {
    const result = getNextType('test-conversion', 79, mockConversionMap)
    expect(result).toBe(81)
  })
  
  it('should convert number within second range', () => {
    const result = getNextType('test-conversion', 55, mockConversionMap)
    expect(result).toBe(57)
  })

  it('should handle range boundaries correctly', () => {
    // lower boundary
    expect(getNextType('test-conversion', 50, mockConversionMap)).toBe(52)
    // upper boundary
    expect(getNextType('test-conversion', 97, mockConversionMap)).toBe(99)
  })

  it('should throw error for non-existent conversion type', () => {
    expect(() => {
      getNextType('non-existent', 42, mockConversionMap)
    }).toThrow('Conversion type "non-existent" not found')
  })
})