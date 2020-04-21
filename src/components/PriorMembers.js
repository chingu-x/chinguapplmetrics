import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Pie } from '@nivo/pie'

export default function PriorMembers(props) {
  
  // Setup the Prior Member chart
  const priorMemberProps = {
      width: 800,
      height: 400,
      margin: { top: 80, right: 120, bottom: 80, left: 120 },
      data: props.priorMemberMetrics,
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
      <Pie {...priorMemberProps} groupMode="grouped" />
    </React.Fragment>
  )
}

PriorMembers.propTypes = {
  priorMemberMetrics: PropTypes.array.isRequired,
}