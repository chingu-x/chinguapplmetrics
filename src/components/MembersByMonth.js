import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Bar } from '@nivo/bar'
import createPaidMemberMetrics from '../util/createPaidMemberMetrics'

export default function MembersByMonth(props) {
  const [fileContents] = useState(props.fileContents)
  const [paidMemberJSON, setPaidMemberJSON] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (fileContents !== '') {
        setPaidMemberJSON(await createPaidMemberMetrics(fileContents))
        setIsDataLoaded(true)
      }
    }
    fetchData();

  },[fileContents, setPaidMemberJSON, setIsDataLoaded])

  // Setup the Paid Member bar chart
  const paidMemberKeys = paidMemberJSON.map(source => (source.name))
  const paidMemberProps = {
      layout: 'vertical',
      colors: '#ff7400',
      width: 1200,
      height: 475,
      margin: { top: 0, right: 40, bottom: 60, left: 180 },
      data: paidMemberJSON,
      indexBy: 'name',
      paidMemberKeys,
      padding: 0.5,
      labelTextColor: 'inherit:darker(1.6)',
      labelSkipWidth: 16,
      labelSkipHeight: 16,
  }

  return (
    <React.Fragment>
      <Typography variant="h6" color="inherit" noWrap>
        Paid Plan Signups by Month
      </Typography>
      { isDataLoaded
        ? (<Bar {...paidMemberProps} groupMode="grouped" />)
        : (' ')
      }
    </React.Fragment>
  )
}

MembersByMonth.propTypes = {
  fileContents: PropTypes.string.isRequired,
}