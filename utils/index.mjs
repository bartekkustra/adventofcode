import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readFileSync, writeFileSync } from 'fs'

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

export const updateMainBadge = async (year, day, which) => {
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

  // const json = {}
  // for(let y = 2015; y <= 2021; y++) {
  //   json[y] = {}
  //   for(let d = 1; d <= 25; d++) {
  //     if (d < 10) {
  //       d = `0${d}`
  //     } else {
  //       d = `${d}`
  //     }
  //     json[y][d] = {
  //       p1: false,
  //       p2: false,
  //     }
  //   }
  // }

  const parsedData = await JSON.parse(currentCompletion)
  if (which === 'p1') parsedData[year][day]["p1"] = true
  if (which === 'p2') parsedData[year][day]["p2"] = true

  const stringOutput = await JSON.stringify(parsedData)

  await writeFileSync('./utils/completion.json', stringOutput, (err) => {
    if (err) {
      console.error('Error writing completion.json file', err)
    }
  })
}