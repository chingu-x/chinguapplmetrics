import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Bar } from '@nivo/bar'
import { Pie } from '@nivo/pie'

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
      <CssBaseline />
      <Container className={ classes.moiContainer } maxWidth="lg">
        <Typography variant="h6" color="inherit" noWrap>
          New/Existing Members
        </Typography>
        <Pie {...priorMemberProps} groupMode="grouped" />

        <Typography variant="h6" color="inherit" noWrap>
          Paid Plan Signups by Month
        </Typography>
        <Bar {...paidMemberProps} groupMode="grouped" />

        <Typography variant="h6" color="inherit" noWrap>
          How Members Found Us
        </Typography>
        <Bar {...sourceProps} groupMode="grouped" />
      </Container>
    </React.Fragment>
  )
}

OutputArea.propTypes = {
  sourceMetrics: PropTypes.array.isRequired,
  priorMemberMetrics: PropTypes.array.isRequired,
  paidMemberMetrics: PropTypes.array.isRequired,
}