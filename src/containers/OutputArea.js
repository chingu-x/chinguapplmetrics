import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Bar } from '@nivo/bar'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
  },
  moiContainer: {
    marginTop: 0,
    paddingTop: 0,
  },
  moiList: {

  },
}))

export default function OutputArea(props) {
  const classes = useStyles()

  // Sort in decending sourceCount order
  const compare = (a, b) => {
    let comparisonResult = 0;
    if (a.value < b.value) {
      comparisonResult = 1;
    } else if (a.value > b.value) {
      comparisonResult = -1;
    }
    return comparisonResult;
  }

  const sortedSources = props.sourceMetrics.sort(compare)
  const sourceKeys = sortedSources.map(source => (source.name))

  const commonProps = {
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
      <CssBaseline />
      <Container className={ classes.moiContainer } maxWidth="lg">
      <Bar {...commonProps} groupMode="grouped" />
      </Container>
    </React.Fragment>
  )
}

OutputArea.propTypes = {
  sourceMetrics: PropTypes.array.isRequired
}