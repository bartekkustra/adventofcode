import { readFileSync } from 'fs'

export const importFile = (directory, filename) => 
  readFileSync(`./${directory}/${filename}`, {encoding: 'utf-8'}, (err, data) => {
    if(err) {
      console.error(`Error file parsing file`, err)
    } else {
      return data
    }
  })
