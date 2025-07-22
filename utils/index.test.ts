import {
  LATEST_YEAR,
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
    const p1 = '100'
    const p2 = '200'
    const dir = 'data'

    const expectedReadme = `## TypeScript\n[![Part 1](https://img.shields.io/badge/Part%201-${p1}ms-informational)](https://adventofcode.com/${LATEST_YEAR}/)\n[![Part 2](https://img.shields.io/badge/Part%202-${p2}ms-informational)](https://adventofcode.com/${LATEST_YEAR}/)`

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
