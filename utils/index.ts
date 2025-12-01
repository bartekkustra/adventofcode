import { readFileSync, writeFileSync } from 'fs'

export const LATEST_YEAR = 2025

export const blocks = {
  full: '█',
  empty: '⠀',
}

export const importFile = (
  directoryOrFile: string,
  filename?: string,
): string => {
  const path = filename
    ? `./${directoryOrFile}/${filename}`
    : directoryOrFile

  try {
    return readFileSync(path, { encoding: 'utf-8' }).replace(/\r/g, '')
  } catch (err) {
    throw new Error(`Error parsing file - ${err}`)
  }
}


export const updateTimes = async (p1: string, p2: string, dir: string): Promise<void> => {
  // URL-encode the time strings (handles μs symbol)
  const p1Encoded = encodeURIComponent(p1)
  const p2Encoded = encodeURIComponent(p2)
  const readme = `## TypeScript\n[![Part 1](https://img.shields.io/badge/Part%201-${p1Encoded}-informational)](https://adventofcode.com/${LATEST_YEAR}/)\n[![Part 2](https://img.shields.io/badge/Part%202-${p2Encoded}-informational)](https://adventofcode.com/${LATEST_YEAR}/)`
  try {
    writeFileSync(`${dir}/README.md`, readme)
  } catch (error) {
    console.error(`Error writing ${dir}/README.md`, error)
  }
}

export const getDay = (url: string) => {
  return url.replace(/(.*)([0-9]{2})$/, '$2')
}

/**
 * Formats a time duration (in milliseconds) with appropriate units.
 * - μs for times < 1ms
 * - ms for times 1ms - 999ms
 * - s for times >= 1000ms
 */
export const formatTime = (ms: number): string => {
  if (ms < 1) {
    // Convert to microseconds
    const us = ms * 1000
    return `${us.toFixed(1)}μs`
  } else if (ms >= 1000) {
    // Convert to seconds
    const s = ms / 1000
    return `${s.toFixed(2)}s`
  } else {
    // Keep as milliseconds
    return `${ms.toFixed(2)}ms`
  }
}

export const updateMainBadge = async (year: number, day: string, parts: { p1: any; p2: any }) => {
  let p1 = false
  let p2 = false
  if (parts.p1 !== 0) {
    p1 = true
  }
  if (parts.p2 !== 0) {
    p2 = true
  }

  let currentCompletion: any
  try {
    currentCompletion = readFileSync('./utils/completion.json', {encoding: 'utf-8'})
  } catch (error) {
    console.error('Error parsing file', error)
    return
  }

  if (!currentCompletion) {
    return
  }

  const parsedData = JSON.parse(currentCompletion)
  parsedData[year][day]["p1"] = p1
  parsedData[year][day]["p2"] = p2

  const stringOutput = JSON.stringify(parsedData)

  try {
    writeFileSync('./utils/completion.json', stringOutput)
  } catch (error) {
    console.error('Error writing completion.json file', error)
  }

  const pickColor = (v: number) => {
    let color = 'lightgrey'
    if (v > 10) color = 'red'
    if (v > 20) color = 'orange'
    if (v > 30) color = 'yellow'
    if (v > 40) color = 'green'
    if (v === 50) color = 'brightgreen'
    return color
  }

  for(let years = 2015; years <= LATEST_YEAR; years++) {
    let completed = 0
    let tempDay = ''
    for(let days = 1; days <= 25; days++) {
      if(days < 10) {
        tempDay = `0${days}`
      } else {
        tempDay = `${days}`
      }
      if(parsedData[`${years}`][tempDay]["p1"]) completed++
      if(parsedData[`${years}`][tempDay]["p2"]) completed++
    }

    const badge = JSON.stringify({
      schemaVersion: 1,
      label: `${years}:`,
      message: `${completed}/50`,
      color: pickColor(completed),
      style: "for-the-badge"
    })

    try {
      writeFileSync(`./.github/badges/${years}.json`, badge)
    } catch (error) {
      console.error(`Error writing .github/badges/${years}.json`, error)
    }
  }
}