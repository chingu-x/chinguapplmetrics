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

  const updateMetric = (metricsArray, signupMonth) => {
    if (signupMonth !== '' && signupMonth !== undefined) {
      for (const i in metricsArray) {
        if (metricsArray[i].name === signupMonth) {
          metricsArray[i].value = metricsArray[i].value + 1
          break
        }
      }
    }
  }

  const searchForMember = (metricsArray, signupMonth) => {
    let found = false
    if (signupMonth !== '' && signupMonth !== undefined) {
      for(const element of metricsArray) {
        found = element.name === signupMonth
        if (found) break
      }
    }
    return found
  }

  // Convert the CSV into a JSON object
  let memberMetrics = []

  const jsonObj = await (await csv().fromString(fileContents)).filter(member => member.payment_status === 'PAID')
  jsonObj.forEach((member) => {
    let found = searchForMember(memberMetrics, getSignupMonth(member.created_at))
    if (found) {
      updateMetric(memberMetrics, getSignupMonth(member.created_at))
    } else {
      addMetric(memberMetrics, getSignupMonth(member.created_at))
    }
  })

  return memberMetrics
}

export default createPaidMemberMetrics