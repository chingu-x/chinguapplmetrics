const csv = require('csvtojson')

const createPaidMemberMetrics = async (fileContents) => {

  const getSignupMonth = (created_at) => (created_at.substring(5, 7).concat('/',created_at.substring(0,4)))

  const addMetric = (metricsArray, signupMonth) => {
    if (signupMonth !== '' && signupMonth !== undefined) {
      metricsArray.push({
        name: signupMonth,
        value: 1,
      })
    }
  }

  const updateMetric = (metricsArray, memberIndex, signupMonth) => {
    if (signupMonth !== '' && signupMonth !== undefined) {
      metricsArray[memberIndex].value = metricsArray[memberIndex].value + 1
    }
  }

  const searchForMember = (metricsArray, signupMonth) => {
    let index = -1
    if (signupMonth !== '' && signupMonth !== undefined) {
      index = metricsArray.findIndex(element => (element.name === signupMonth))
    }
    return index
  }

  // Convert the CSV into a JSON object
  let memberMetrics = []

  const jsonObj = await (await csv().fromString(fileContents)).filter(member => member.payment_status === 'PAID')
  jsonObj.forEach((member) => {
    const memberIndex = searchForMember(memberMetrics, getSignupMonth(member.created_at))
    if (memberIndex > -1) {
      updateMetric(memberMetrics, memberIndex, getSignupMonth(member.created_at))
    } else {
      addMetric(memberMetrics, getSignupMonth(member.created_at))
    }
  })

  return memberMetrics
}

export default createPaidMemberMetrics