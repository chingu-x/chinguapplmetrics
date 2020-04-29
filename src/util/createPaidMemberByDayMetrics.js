const csv = require('csvtojson')

const createPaidMemberByDayMetrics = async (fileContents) => {

  const getSignupDay = (created_at) => (created_at.substring(8,10))

  const addMetric = (metricsArray, signupDay) => {
    if (signupDay !== '' && signupDay !== undefined) {
      metricsArray.push({
        name: signupDay,
        value: 1,
      })
    }
  }

  const updateMetric = (metricsArray, memberIndex, signupDay) => {
    if (signupDay !== '' && signupDay !== undefined) {
      metricsArray[memberIndex].value = metricsArray[memberIndex].value + 1
    }
  }

  const searchForMember = (metricsArray, signupDay) => {
    let index = -1
    if (signupDay !== '' && signupDay !== undefined) {
      index = metricsArray.findIndex(element => (element.name === signupDay))
    }
    return index
  }

  // Convert the CSV into a JSON object
  let memberMetrics = []

  const jsonObj = await (await csv().fromString(fileContents)).filter(member => member.payment_status === 'PAID')
  jsonObj.forEach((member) => {
    const memberIndex = searchForMember(memberMetrics, getSignupDay(member.created_at))
    if (memberIndex > -1) {
      updateMetric(memberMetrics, memberIndex, getSignupDay(member.created_at))
    } else {
      addMetric(memberMetrics, getSignupDay(member.created_at))
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

export default createPaidMemberByDayMetrics