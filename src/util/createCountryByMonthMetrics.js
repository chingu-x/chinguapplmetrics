const csv = require('csvtojson')

const createCountryByMonthMetrics = async (fileContents) => {

  const getCreatedMonthYear = (created_at) => 
    (created_at.substring(5,7).concat('/',created_at.substring(0,4)))

  const addMetric = (metricsArray, country_code, created_at) => {
    if (country_code !== '' && country_code !== undefined) {
      const creationMonthYear = getCreatedMonthYear(created_at)
      metricsArray.push({
        id: country_code,
        data: [{
          x: creationMonthYear,
          y: 1,
        }],
      })
    }
  }

  const updateMetric = (metricsArray, country_code, created_at) => {
    if (country_code !== '' && country_code !== undefined) {
      for (const i in metricsArray) {
        if (metricsArray[i].id === country_code) {
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

  const searchForCountry = (metricsArray, country_code) => {
    let found = false
    if (country_code !== '' && country_code !== undefined) {
      for (const element of metricsArray) {
        found = element.id === country_code
        if (found) break
      }
    }
    return found
  }

  // Convert the CSV into a JSON object
  let countryMetrics = []

  const jsonObj = await (await csv().fromString(fileContents)).filter(member => member.payment_status === 'PAID')
  jsonObj.forEach((country) => {
    let found = searchForCountry(countryMetrics, country.country_code)
    if (found) {
      updateMetric(countryMetrics, country.country_code, country.created_at)
    } else {
      addMetric(countryMetrics, country.country_code, country.created_at)
    }
  })

  console.log(countryMetrics)

  return countryMetrics
    .sort((a, b) => {
      if (a.value > b.value) {
        return -1;
      }
      if (a.value < b.value) {
        return 1;
      }
      // a must be equal to b
      return 0;
    })
    //.slice(0,9)

}

export default createCountryByMonthMetrics