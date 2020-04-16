import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Bar } from 'react-chartjs-2'

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
    if (a.sourceCount < b.sourceCount) {
      comparisonResult = 1;
    } else if (a.sourceCount > b.sourceCount) {
      comparisonResult = -1;
    }
    return comparisonResult;
  }

  const sortedSources = props.sourceMetrics.sort(compare)
  const sourceLabels = sortedSources.map(source => (source.source))
  const sourceCounts = sortedSources.map(source => (source.sourceCount))

  const chartData = {
    labels: sourceLabels,
    datasets: [
      {
        label: 'Counts',
        backgroundColor: 'rgba(255,116,0)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: sourceCounts
      }
    ]
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={ classes.moiContainer } maxWidth="lg">
        <Bar
          data={ chartData }
          options={{
            title:{
              display:true,
              text:'How Members Found Us',
              fontSize:20
            },
            legend:{
              display:false,
            },
          }}
        />
      </Container>
    </React.Fragment>
  )
}

OutputArea.propTypes = {
  sourceMetrics: PropTypes.array.isRequired
}