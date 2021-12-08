import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readFileSync, writeFileSync } from 'fs'

export const LATEST_YEAR = 2021

export const importFile = (directory, filename) => 
  readFileSync(`./${directory}/${filename}`, {encoding: 'utf-8'}, (err, data) => {
    if(err) {
      console.error(`Error file parsing file`, err)
    } else {
      return data
    }
  })


export const updateTimes = (p1, p2, dir) => {
  const readme = `## JavaScript\n[![Part 1](https://img.shields.io/badge/Part%201-${p1}ms-informational)](https://adventofcode.com/2021/)\n[![Part 2](https://img.shields.io/badge/Part%202-${p2}ms-informational)](https://adventofcode.com/2021/)`
  writeFileSync(`${dir}/README.md`, readme, (err) => {
    if (err) {
      console.error(`Error writing ${dir}/README.md`, err)
    }
  })
}

export const getDay = (url) => {
  const __filename = fileURLToPath(url);
  return dirname(__filename).replace(/(.*)([0-9]{2})$/, '$2')
}

export const updateMainBadge = async (year, day, parts) => {
  let p1 = false
  let p2 = false
  if (parts.p1 !== 0) {
    p1 = true
  }
  if (parts.p2 !== 0) {
    p2 = true
  }

  const currentCompletion = await readFileSync(
    './utils/completion.json',
    {encoding: 'utf-8'},
    (err, data) => {
      if (err) {
        console.error('Error parsing file', err)
      } else {
        return data
      }
    }
  )

  const parsedData = await JSON.parse(currentCompletion)
  parsedData[year][day]["p1"] = p1
  parsedData[year][day]["p2"] = p2

  const stringOutput = await JSON.stringify(parsedData)

  await writeFileSync('./utils/completion.json', stringOutput, (err) => {
    if (err) {
      console.error('Error writing completion.json file', err)
    }
  })

  const pickColor = (v) => {
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
    for(let days = 1; days <= 25; days++) {
      if(days < 10) {
        days = `0${days}`
      } else {
        days = `${days}`
      }
      if(parsedData[`${years}`][days]["p1"]) completed++
      if(parsedData[`${years}`][days]["p2"]) completed++
    }

    const badge = JSON.stringify({
      schemaVersion: 1,
      label: years,
      message: `${completed}/50`,
      color: pickColor(completed),
      style: "for-the-badge"
    })

    await writeFileSync(`./.github/badges/${years}.json`, badge, (err) => {
      if (err) {
        console.error(`Error writing .github/badges/${years}.json`, err)
      }
    })
  }
}