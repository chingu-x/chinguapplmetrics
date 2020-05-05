import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Line } from '@nivo/line'
import createCountryByMonthMetrics from '../util/createCountryByMonthMetrics'

export default function CountryByMonth(props) {
  const [fileContents] = useState(props.fileContents)
  const [countryByMonthJSON, setCountryByMonthJSON] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (fileContents !== '') {
        setCountryByMonthJSON(await createCountryByMonthMetrics(fileContents))
        setIsDataLoaded(true)
      }
    }
    fetchData()
  },[fileContents, setCountryByMonthJSON, setIsDataLoaded]) 

  // Setup the Source bar chart
  let countryByMonthKeys
  if (isDataLoaded) {
    countryByMonthKeys = countryByMonthJSON.map(country => (country.country_code))
  }

  const countryByMonthProps = {
    colors: {"scheme": "category10"},
    width: 1200,
    height: 475,
    margin: { top: 0, right: 190, bottom: 60, left: 60 },
    data: countryByMonthJSON,
    indexBy: 'name',
    countryByMonthKeys,
    useMesh: true,
    legends: [
      {
        anchor: 'bottom-right',
        direction: 'column',
        itemWidth: 120,
        itemHeight: 20,
        translateX: 130,
      }
    ]
  }

  return (
    <React.Fragment>
      <Typography variant="h6" color="inherit" noWrap>
        Member Country by Month
      </Typography>
      <Line { ...countryByMonthProps } groupMode="grouped" />
    </React.Fragment>
  )
}

CountryByMonth.propTypes = {
  fileContents: PropTypes.string.isRequired,
}