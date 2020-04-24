import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Line } from '@nivo/line'
import createSourceByTimeMetrics from '../util/createSourceByTimeMetrics'

export default function SourceByTime(props) {
  const [fileContents] = useState(props.fileContents)
  const [sourceJSON, setSourceJSON] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (fileContents !== '') {
        setSourceJSON(await createSourceByTimeMetrics(fileContents))
        setIsDataLoaded(true)
      }
    }
    fetchData()
  },[fileContents, setSourceJSON, setIsDataLoaded]) 

  // Setup the Source bar chart
  let sourceKeys
  if (isDataLoaded) {
    sourceKeys = sourceJSON.map(source => (source.name))
  }

  const sourceProps = {
    colors: {"scheme": "category10"},
    width: 1200,
    height: 475,
    margin: { top: 0, right: 40, bottom: 60, left: 180 },
    data: sourceJSON,
    indexBy: 'name',
    sourceKeys,
  }

  return (
    <React.Fragment>
      <Typography variant="h6" color="inherit" noWrap>
        How Members Found Us Over Time
      </Typography>
      <Line {...sourceProps} groupMode="grouped" />
    </React.Fragment>
  )
}

SourceByTime.propTypes = {
  fileContents: PropTypes.string.isRequired,
}