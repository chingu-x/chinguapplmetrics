const csv = require('csvtojson')
const conditions = require('./sourceConditions')

const createSourceByTimeMetrics = async (fileContents) => {

  let primaryMetrics = []
  let secondaryMetrics = []

  const getCreatedMonthYear = (created_at) => 
    (created_at.substring(5,7).concat('/',created_at.substring(0,4)))

  const addMetric = (metricsArray, source, created_at) => {
    if (source !== '' && source !== undefined) {
      const creationMonthYear = getCreatedMonthYear(created_at)
      metricsArray.push({
        id: source,
        data: [{
          x: creationMonthYear,
          y: 1,
        }],
      })
    }
  }

  const updateMetric = (metricsArray, source, created_at) => {
    if (source !== '' && source !== undefined) {
      for (const i in metricsArray) {
        if (metricsArray[i].id === source) {
          let dataFound = false
          for (const j in metricsArray[i].data) {
            if (metricsArray[i].data[j].x === getCreatedMonthYear(created_at)) {
              metricsArray[i].data[j].y = metricsArray[i].data[j].y + 1
              dataFound = true
              break
            }
          }
          if (!dataFound) {
            metricsArray[i].data.push({
              x: getCreatedMonthYear(created_at),
              y: 1,
            })
          }
        }
      }
    }
  }

  const searchForSource = (metricsArray, source) => {
    let found = false
    if (source !== '' && source !== undefined) {
      for (const element of metricsArray) {
        found = element.id === source
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

  const examineOtherSource = (otherSource, created_at) => {
    if (otherSource === '') return
    const source = categorizeOther(otherSource)
    if (source !== false) {
      let found = searchForSource(secondaryMetrics, source)
      if (found) {
        updateMetric(secondaryMetrics, source, created_at)
      } else {
        addMetric(secondaryMetrics, source, created_at)
      }
    }
  }

  // Convert the CSV into a JSON object
  const jsonObj = await csv().fromString(fileContents)
  jsonObj.forEach((currentEntry) => {
    let found = searchForSource(primaryMetrics, currentEntry.source)
    if (found) {
      updateMetric(primaryMetrics, currentEntry.source, currentEntry.created_at)
    } else {
      addMetric(primaryMetrics, currentEntry.source, currentEntry.created_at)
    }
    examineOtherSource(currentEntry.other_source, currentEntry.created_at)
  })
  
  // Combine the primary and secondary metrics into a single object array
  let combinedMetrics = []
  for (const metric of primaryMetrics) {
    if (metric.id !== 'OTHER') {
      combinedMetrics.push(metric)
    }
  }
  for (const metric of secondaryMetrics) {
    combinedMetrics.push(metric)
  }

  return combinedMetrics
}

export default createSourceByTimeMetrics