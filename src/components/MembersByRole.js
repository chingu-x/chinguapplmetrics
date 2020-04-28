import React, {useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Bar } from '@nivo/bar'
import createMemberByRoleMetrics from '../util/createMemberByRoleMetrics'

export default function MembersByRole(props) {
  const [fileContents] = useState(props.fileContents)
  const [memberRoleJSON, setMemberRoleJSON] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (fileContents !== '') {
        setMemberRoleJSON(await createMemberByRoleMetrics(fileContents))
        setIsDataLoaded(true)
      }
    }
    fetchData();

  },[fileContents, setMemberRoleJSON, setIsDataLoaded])

  // Setup the Paid Member bar chart
  const memberRoleKeys = memberRoleJSON.map(source => (source.name))
  const memberRoleProps = {
      layout: 'vertical',
      colors: '#ff7400',
      width: 1200,
      height: 475,
      margin: { top: 0, right: 40, bottom: 60, left: 180 },
      data: memberRoleJSON,
      indexBy: 'name',
      memberRoleKeys,
      padding: 0.5,
      labelTextColor: 'inherit:darker(1.6)',
      labelSkipWidth: 16,
      labelSkipHeight: 16,
  }

  return (
    <React.Fragment>
      <Typography variant="h6" color="inherit" noWrap>
        Members by Desired Role
      </Typography>
      { isDataLoaded
        ? (<Bar {...memberRoleProps} groupMode="grouped" />)
        : (' ')
      }
    </React.Fragment>
  )
}

MembersByRole.propTypes = {
  fileContents: PropTypes.string.isRequired,
}