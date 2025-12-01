import {
  LATEST_YEAR,
  formatTime,
  getDay,
  importFile,
  updateMainBadge,
  updateTimes,
} from './index'

import fs from 'fs'

describe('importFile', () => {
  it('should import a file successfully', () => {
    const directory = 'data'
    const filename = 'input.txt'
    const expectedContent = 'This is the file content'

    // Mock the readFileSync function
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(expectedContent)

    const result = importFile(directory, filename)

    expect(result).toBe(expectedContent)
    expect(fs.readFileSync).toHaveBeenCalledWith(`./${directory}/${filename}`, { encoding: 'utf-8' })
  })

  it('should throw an error if file parsing fails', () => {
    const directory = 'data'
    const filename = 'input.txt'
    const expectedError = 'Error parsing file - Error: Error parsing file'

    // Mock the readFileSync function to throw an error
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
      throw new Error('Error parsing file')
    })

    expect(() => importFile(directory, filename)).toThrow(expectedError)
    expect(fs.readFileSync).toHaveBeenCalledWith(`./${directory}/${filename}`, { encoding: 'utf-8' })
  })
});

describe('updateTimes', () => {
  it('should update the README file successfully', async () => {
    const p1 = '100.000ms'
    const p2 = '200.000ms'
    const dir = 'data'

    const expectedReadme = `## TypeScript\n[![Part 1](https://img.shields.io/badge/Part%201-${encodeURIComponent(p1)}-informational)](https://adventofcode.com/${LATEST_YEAR}/)\n[![Part 2](https://img.shields.io/badge/Part%202-${encodeURIComponent(p2)}-informational)](https://adventofcode.com/${LATEST_YEAR}/)`

    // Mock the writeFileSync function
    jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => {})

    await updateTimes(p1, p2, dir)

    expect(fs.writeFileSync).toHaveBeenCalledWith(`${dir}/README.md`, expectedReadme)
  })

  it('should URL-encode microsecond times correctly', async () => {
    const p1 = '153.000μs'
    const p2 = '377.000μs'
    const dir = 'data'

    const expectedReadme = `## TypeScript\n[![Part 1](https://img.shields.io/badge/Part%201-${encodeURIComponent(p1)}-informational)](https://adventofcode.com/${LATEST_YEAR}/)\n[![Part 2](https://img.shields.io/badge/Part%202-${encodeURIComponent(p2)}-informational)](https://adventofcode.com/${LATEST_YEAR}/)`

    // Mock the writeFileSync function
    jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => {})

    await updateTimes(p1, p2, dir)

    expect(fs.writeFileSync).toHaveBeenCalledWith(`${dir}/README.md`, expectedReadme)
  })

  it('should handle errors when updating the README file', async () => {
    const p1 = '100'
    const p2 = '200'
    const dir = 'data'

    const expectedError = new Error('Error writing data/README.md')

    // Mock the writeFileSync function to throw an error
    jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => {
      throw expectedError
    })

    console.error = jest.fn() // Mock console.error

    await updateTimes(p1, p2, dir)

    expect(fs.writeFileSync).toHaveBeenCalledWith(`${dir}/README.md`, expect.any(String))
    expect(console.error).toHaveBeenCalledWith(`Error writing ${dir}/README.md`, expectedError)
  })
})

describe('getDay', () => {
  it('should return the day number from the URL', () => {
    const url = 'https://adventofcode.com/2021/day/01'
    const expectedDay = '01'

    const result = getDay(url)

    expect(result).toBe(expectedDay)
  })
})

describe('formatTime', () => {
  it('should format sub-millisecond times in microseconds', () => {
    expect(formatTime(0.153)).toBe('153.000μs')
    expect(formatTime(0.377)).toBe('377.000μs')
    expect(formatTime(0.001)).toBe('1.000μs')
    expect(formatTime(0.9999)).toBe('999.900μs')
  })

  it('should format millisecond times in milliseconds', () => {
    expect(formatTime(1)).toBe('1.000ms')
    expect(formatTime(1.5)).toBe('1.500ms')
    expect(formatTime(100.123)).toBe('100.123ms')
    expect(formatTime(999.99)).toBe('999.990ms')
  })

  it('should format times >= 1000ms in seconds', () => {
    expect(formatTime(1000)).toBe('1.000s')
    expect(formatTime(1500)).toBe('1.500s')
    expect(formatTime(12345)).toBe('12.345s')
  })

  it('should handle edge cases', () => {
    expect(formatTime(0)).toBe('0.000μs')
    expect(formatTime(0.0001)).toBe('0.100μs')
  })
})
