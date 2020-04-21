import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Bar } from '@nivo/bar'

export default function MembersByMonth(props) {

  // Setup the Paid Member bar chart
  const paidMemberKeys = props.paidMemberMetrics.map(source => (source.name))
  const paidMemberProps = {
      layout: 'vertical',
      colors: '#ff7400',
      width: 1200,
      height: 475,
      margin: { top: 0, right: 40, bottom: 60, left: 180 },
      data: props.paidMemberMetrics,
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
      <Bar {...paidMemberProps} groupMode="grouped" />
    </React.Fragment>
  )
}

MembersByMonth.propTypes = {
  paidMemberMetrics: PropTypes.array.isRequired,
}