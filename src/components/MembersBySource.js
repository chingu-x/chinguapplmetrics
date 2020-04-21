import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Bar } from '@nivo/bar'

export default function MembersBySource(props) {

  // Sort in decending order
  const compare = (a, b) => {
    let comparisonResult = 0;
    if (a.value < b.value) {
      comparisonResult = 1;
    } else if (a.value > b.value) {
      comparisonResult = -1;
    }
    return comparisonResult;
  }

  // Setup the Source bar chart
  const sortedSources = props.sourceMetrics.sort(compare)
  const sourceKeys = sortedSources.map(source => (source.name))
  const sourceProps = {
      layout: 'horizontal',
      colors: '#ff7400',
      width: 1200,
      height: 475,
      margin: { top: 0, right: 40, bottom: 60, left: 180 },
      data: sortedSources,
      indexBy: 'name',
      sourceKeys,
      padding: 0.5,
      labelTextColor: 'inherit:darker(1.6)',
      labelSkipWidth: 16,
      labelSkipHeight: 16,
  }

  return (
    <React.Fragment>
      <Typography variant="h6" color="inherit" noWrap>
        How Members Found Us
      </Typography>
      <Bar {...sourceProps} groupMode="grouped" />
    </React.Fragment>
  )
}

MembersBySource.propTypes = {
  sourceMetrics: PropTypes.array.isRequired,
}