const fs = require('fs')

if (process.argv[2] === undefined) {
  console.error(`Usage: node csv2json.js <file.csv>`)
  process.exit(1)
}

const filename = process.argv[2]
const fileText = fs.readFileSync(filename).toString()
const rows = fileText.split('\r\n')

const headerRow = rows[0];
const dataRows = rows.slice(1)

const fieldNames = headerRow.split(',')

let objResult = [];

for (let i = 0; i < dataRows.length; i++) {
  if (dataRows[i] === "") {
    continue
  }
  
  let obj = {}
  const data = dataRows[i].split(',')

  for (let j = 0; j < fieldNames.length; j++) {
    const fieldName = fieldNames[j].toLowerCase()
    const asNumber = Number(data[j])
    obj[fieldName] = isNaN(asNumber) ? data[j] : asNumber
  }

  objResult.push(obj)
}

const jsonText = JSON.stringify(objResult)
const outputFilename = filename.replace('.csv', '.json')
fs.writeFileSync(outputFilename, jsonText)
