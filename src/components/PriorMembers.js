import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Pie } from '@nivo/pie'
import createPriorMemberMetrics from '../util/createPriorMemberMetrics'

export default function PriorMembers(props) {
  const [fileContents] = useState(props.fileContents)
  const [priorMemberJSON, setPriorMemberJSON] = useState()
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (fileContents !== '') {
        setPriorMemberJSON(await createPriorMemberMetrics(fileContents))
        setIsDataLoaded(true)
      }
    }
    fetchData();

  },[fileContents, setPriorMemberJSON, setIsDataLoaded])
  
  // Setup the Prior Member chart
  const priorMemberProps = {
      width: 800,
      height: 400,
      margin: { top: 80, right: 120, bottom: 80, left: 120 },
      data: priorMemberJSON,
      innerRadius: 0.6,
      padAngle: 0.5,
      cornerRadius: 5,
      radialLabelsLinkColor: "inherit",
      radialLabelsLinkStrokeWidth: 3,
      radialLabelsTextColor: "inherit:darker(1.2)",
  }

  return (
    <React.Fragment>
      <Typography variant="h6" color="inherit" noWrap>
        New/Existing Members
      </Typography>
      { isDataLoaded
        ? (<Pie {...priorMemberProps} groupMode="grouped" /> )
        : (' ')
      }
    </React.Fragment>
  )
}

PriorMembers.propTypes = {
  fileContents: PropTypes.string.isRequired,
}