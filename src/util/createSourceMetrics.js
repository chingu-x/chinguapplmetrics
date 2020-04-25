const csv = require('csvtojson')
const conditions = require('./sourceConditions')

const createSourceMetrics = async (fileContents) => {

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

  const updateMetric = (metricsArray, memberIndex, source) => {
    if (source !== '' && source !== undefined) {
      metricsArray[memberIndex].value = metricsArray[memberIndex].value + 1
    }
  }

  const searchForSource = (metricsArray, source) => {
    let index = -1
    if (source !== '' && source !== undefined) {
      index = metricsArray.findIndex(element => (element.name === source))
    }
    return index
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
      const memberIndex = searchForSource(secondaryMetrics, source)
      if (memberIndex > -1) {
        updateMetric(secondaryMetrics, memberIndex, source)
      } else {
        addMetric(secondaryMetrics, source)
      }
    }
  }

  // Convert the CSV into a JSON object
  const jsonObj = await csv().fromString(fileContents)
  jsonObj.forEach((currentEntry) => {
    const memberIndex = searchForSource(primaryMetrics, currentEntry.source)
    if (memberIndex > -1) {
      updateMetric(primaryMetrics, memberIndex, currentEntry.source)
    } else {
      addMetric(primaryMetrics, currentEntry.source)
    }
    examineOtherSource(currentEntry.other_source)
  })
  
  // Combine the primary and secondary metrics into a single object array
  let combinedMetrics = []
  primaryMetrics.filter(element => (element.name !== 'OTHER'))
    .forEach(element => combinedMetrics.push(element))
  secondaryMetrics.forEach(element => combinedMetrics.push(element))

  return combinedMetrics
}

export default createSourceMetrics