import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Bar } from '@nivo/bar'
import createMemberByTierMetrics from '../util/createMemberByTierMetrics'

export default function MembersByTier(props) {
  const [fileContents] = useState(props.fileContents)
  const [memberTierJSON, setMemberTierJSON] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (fileContents !== '') {
        setMemberTierJSON(await createMemberByTierMetrics(fileContents))
        setIsDataLoaded(true)
      }
    }
    fetchData();

  },[fileContents, setMemberTierJSON, setIsDataLoaded])

  // Setup the Paid Member bar chart
  const memberTierKeys = memberTierJSON.map(source => (source.name))
  const memberTierProps = {
      layout: 'vertical',
      colors: '#ff7400',
      width: 1200,
      height: 475,
      margin: { top: 0, right: 40, bottom: 60, left: 180 },
      data: memberTierJSON,
      indexBy: 'name',
      memberTierKeys,
      padding: 0.5,
      labelTextColor: 'inherit:darker(1.6)',
      labelSkipWidth: 16,
      labelSkipHeight: 16,
  }

  return (
    <React.Fragment>
      <Typography variant="h6" color="inherit" noWrap>
        Members by Desired Tier
      </Typography>
      { isDataLoaded
        ? (<Bar {...memberTierProps} groupMode="grouped" />)
        : (' ')
      }
    </React.Fragment>
  )
}

MembersByTier.propTypes = {
  fileContents: PropTypes.string.isRequired,
}