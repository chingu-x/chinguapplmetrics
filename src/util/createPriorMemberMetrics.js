const csv = require('csvtojson')

const createPriorMemberMetrics = async (fileContents) => {

  const memberType = (is_previous_member) => 
    (is_previous_member === 't' ? 'Existing Member' : 'New Member')

  const addMetric = (metricsArray, is_previous_member) => {
    if (is_previous_member !== '' && is_previous_member !== undefined) {
      metricsArray.push({
        id: memberType(is_previous_member),
        label: memberType(is_previous_member),
        value: 1,
      })
    }
  }

  const updateMetric = (metricsArray, is_previous_member) => {
    if (is_previous_member !== '' && is_previous_member !== undefined) {
      for (const i in metricsArray) {
        if (metricsArray[i].id === memberType(is_previous_member)) {
          metricsArray[i].value = metricsArray[i].value + 1
          break
        }
      }
    }
  }

  const searchForMember = (metricsArray, is_previous_member) => {
    let found = false
    if (is_previous_member !== '' && is_previous_member !== undefined) {
      for(const element of metricsArray) {
        found = element.id === memberType(is_previous_member)
        if (found) break
      }
    }
    return found
  }

  // Convert the CSV into a JSON object
  let memberMetrics = []

  const jsonObj = await csv().fromString(fileContents)
  jsonObj.forEach((currentEntry) => {
    let found = searchForMember(memberMetrics, currentEntry.is_previous_member)
    if (found) {
      updateMetric(memberMetrics, currentEntry.is_previous_member)
    } else {
      addMetric(memberMetrics, currentEntry.is_previous_member)
    }
  })

  return memberMetrics
}

export default createPriorMemberMetrics