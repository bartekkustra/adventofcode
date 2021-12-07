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
  const data = `## JavaScript\n#### part1: ${p1}ms\n#### part2: ${p2}ms`
  writeFileSync(`${dir}/README.md`, data, (err, dupa) => {
    if (err) {
      console.error(`Error writing file`, err)
    } else {
      console.log('Updated')
    }
  })
}