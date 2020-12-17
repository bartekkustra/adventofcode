const fs = require('fs')

module.exports = {
  importFile: (filename) => fs.readFileSync(`./${filename}`, {encoding: 'utf-8'}, (err, data) => {
    if(err) {
      console.error(`Error file parsing file`, err)
    } else {
      return data
    }
  })

}