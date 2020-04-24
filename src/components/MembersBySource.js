import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Bar } from '@nivo/bar'
import createSourceMetrics from '../util/createSourceMetrics'

export default function MembersBySource(props) {
  const [fileContents] = useState(props.fileContents)
  const [sourceJSON, setSourceJSON] = useState()
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (fileContents !== '') {
        setSourceJSON(await createSourceMetrics(fileContents))
        setIsDataLoaded(true)
      }
    }
    fetchData()
  },[fileContents, setSourceJSON, setIsDataLoaded])  

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
  let sortedSources
  let sourceKeys
  let sourceProps
  if (isDataLoaded) {
    sortedSources = sourceJSON.sort(compare)
    sourceKeys = sortedSources.map(source => (source.name))
    sourceProps = {
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
  }

  return (
    <React.Fragment>
      <Typography variant="h6" color="inherit" noWrap>
        How Members Found Us
      </Typography>
      { isDataLoaded
        ? (<Bar {...sourceProps} groupMode="grouped" /> )
        : (' ')
      }
    </React.Fragment>
  )
}

MembersBySource.propTypes = {
  fileContents: PropTypes.string.isRequired,
}