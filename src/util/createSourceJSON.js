const csv = require('csvtojson')
const conditions = require('./conditions')

const createSourceJSON = async (fileContents) => {

  let primaryMetrics = []
  let secondaryMetrics = []

  const addMetric = (metricsArray, source) => {
    if (source !== '' && source !== undefined) {
      metricsArray.push({
        name: source,
        value: 1,
      })
    }
  }

  const updateMetric = (metricsArray, source) => {
    if (source !== '' && source !== undefined) {
      for (const i in metricsArray) {
        if (metricsArray[i].name === source) {
          metricsArray[i].value = metricsArray[i].value + 1
          break
        }
      }
    }
  }

  const searchForSource = (metricsArray, source) => {
    let found = false
    if (source !== '' && source !== undefined) {
      for(const element of metricsArray) {
        found = element.name === source
        if (found) break
      }
    }
    return found
  }

  const categorizeOther = (otherSource) => {
    if (otherSource !== '' && otherSource !== undefined) {
      for (const translation of conditions) {
        for (const target of translation.targets) {
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

  // Convert the CSV into a JSON object
  const jsonObj = await csv().fromString(fileContents)
  jsonObj.forEach((currentEntry) => {
    let found = searchForSource(primaryMetrics, currentEntry.source)
    if (found) {
      updateMetric(primaryMetrics, currentEntry.source)
    } else {
      addMetric(primaryMetrics, currentEntry.source)
    }
    examineOtherSource(currentEntry.other_source)
  })
  
  // Combine the primary and secondary metrics into a single object array
  let combinedMetrics = []
  for (const metric of primaryMetrics) {
    if (metric.name !== 'OTHER') {
      combinedMetrics.push(metric)
    }
  }
  for (const metric of secondaryMetrics) {
    combinedMetrics.push(metric)
  }

  return combinedMetrics
}

export default createSourceJSON