const csv = require('csvtojson')
const conditions = require('./conditions')
const csvFilePath = '/users/jim/downloads/applications.csv'

let primaryMetrics = [];
let secondaryMetrics = []

const addMetric = (metricsArray, source) => {
  if (source !== '' && source !== undefined) {
    metricsArray.push({
      source: source,
      sourceCount: 1,
    })
  }
}

const updateMetric = (metricsArray, source) => {
  if (source !== '' && source !== undefined) {
    for (let i in metricsArray) {
      if (metricsArray[i].source === source) {
        metricsArray[i].sourceCount = metricsArray[i].sourceCount + 1
        break
      }
    }
  }
}

const searchForSource = (metricsArray, source) => {
  let found = false
  if (source !== '' && source !== undefined) {
    for(element of metricsArray) {
      found = element.source === source
      if (found) break
    }
  }
  return found
}

const categorizeOther = (otherSource) => {
  if (otherSource !== '' && otherSource !== undefined) {
    for (translation of conditions) {
      for (target of translation.targets) {
        const targetFound = otherSource.toLowerCase().indexOf(target)
        if (targetFound > -1) {
          return translation.source
        }
      }
    }
  }
  return false
}

const examineOtherSource = (otherSource) => {
  if (otherSource === '') return
  const source = categorizeOther(otherSource)
  if (source !== false) {
    let found = searchForSource(secondaryMetrics, source)
    if (found) {
      updateMetric(secondaryMetrics, source)
    } else {
      addMetric(secondaryMetrics, source)
    }
  }
}

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
  jsonObj.forEach((currentEntry) => {
    let found = searchForSource(primaryMetrics, currentEntry.source)
    if (found) {
      updateMetric(primaryMetrics, currentEntry.source)
    } else {
      addMetric(primaryMetrics, currentEntry.source)
    }
    examineOtherSource(currentEntry.other_source)
  })

  console.log('primaryMetrics')
  console.log('--------------')
  console.log(primaryMetrics)
  console.log('secondaryMetrics')
  console.log('----------------')
  console.log(secondaryMetrics)
})
 