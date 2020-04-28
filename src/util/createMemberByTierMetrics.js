const csv = require('csvtojson')

const createMemberByTierMetrics = async (fileContents) => {

  const addMetric = (metricsArray, desiredTier) => {
    if (desiredTier !== '' && desiredTier !== undefined) {
      metricsArray.push({
        name: desiredTier,
        value: 1,
      })
    }
  }

  const updateMetric = (metricsArray, memberIndex, desiredTier) => {
    if (desiredTier !== '' && desiredTier !== undefined) {
      metricsArray[memberIndex].value = metricsArray[memberIndex].value + 1
    }
  }

  const searchForMember = (metricsArray, desiredTier) => {
    let index = -1
    if (desiredTier !== '' && desiredTier !== undefined) {
      index = metricsArray.findIndex(element => (element.name === desiredTier))
    }
    return index
  }

  // Convert the CSV into a JSON object
  let memberMetrics = []

  const jsonObj = await (await csv().fromString(fileContents))
  jsonObj.forEach((member) => {
    const memberIndex = searchForMember(memberMetrics, member.desired_tier)
    if (memberIndex > -1) {
      updateMetric(memberMetrics, memberIndex, member.desired_tier)
    } else {
      addMetric(memberMetrics, member.desired_tier)
    }
  })

  return memberMetrics.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    // a must be equal to b
    return 0;
  })
}

export default createMemberByTierMetrics