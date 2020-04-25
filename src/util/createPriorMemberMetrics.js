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

  const updateMetric = (metricsArray, memberIndex, is_previous_member) => {
    if (is_previous_member !== '' && is_previous_member !== undefined) {
      metricsArray[memberIndex].value = metricsArray[memberIndex].value + 1
    }
  }

  const searchForMember = (metricsArray, is_previous_member) => {
    let index = -1
    if (is_previous_member !== '' && is_previous_member !== undefined) {
      index = metricsArray.findIndex(element => (element.id === memberType(is_previous_member)))
    }
    return index
  }

  // Convert the CSV into a JSON object
  let memberMetrics = []

  const jsonObj = await csv().fromString(fileContents)
  jsonObj.forEach((currentEntry) => {
    const memberIndex = searchForMember(memberMetrics, currentEntry.is_previous_member)
    if (memberIndex > -1) {
      updateMetric(memberMetrics, memberIndex, currentEntry.is_previous_member)
    } else {
      addMetric(memberMetrics, currentEntry.is_previous_member)
    }
  })

  return memberMetrics
}

export default createPriorMemberMetrics