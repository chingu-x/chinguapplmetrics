const csv = require('csvtojson')

const createMemberByRoleMetrics = async (fileContents) => {

  const addMetric = (metricsArray, desiredRole) => {
    if (desiredRole !== '' && desiredRole !== undefined) {
      metricsArray.push({
        name: desiredRole,
        value: 1,
      })
    }
  }

  const updateMetric = (metricsArray, memberIndex, desiredRole) => {
    if (desiredRole !== '' && desiredRole !== undefined) {
      metricsArray[memberIndex].value = metricsArray[memberIndex].value + 1
    }
  }

  const searchForMember = (metricsArray, desiredRole) => {
    let index = -1
    if (desiredRole !== '' && desiredRole !== undefined) {
      index = metricsArray.findIndex(element => (element.name === desiredRole))
    }
    return index
  }

  // Convert the CSV into a JSON object
  let memberMetrics = []

  const jsonObj = await (await csv().fromString(fileContents))
  jsonObj.forEach((member) => {
    const memberIndex = searchForMember(memberMetrics, member.desired_role)
    if (memberIndex > -1) {
      updateMetric(memberMetrics, memberIndex, member.desired_role)
    } else {
      addMetric(memberMetrics, member.desired_role)
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

export default createMemberByRoleMetrics