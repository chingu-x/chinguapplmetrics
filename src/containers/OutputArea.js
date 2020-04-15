import React from 'react'
import PropTypes from 'prop-types'; 
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
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
  const classes = useStyles();

  const sourceLabels = props.sourceMetrics.map(source => (source.source)).sort()
  const sourceCounts = props.sourceMetrics.map(source => (source.sourceCount))

  const chartData = {
    labels: sourceLabels,
    datasets: [
      {
        label: 'Counts',
        backgroundColor: 'rgba(75,192,192,1)',
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
        <Typography variant="h6" color="inherit" align="left" noWrap>
            Application Sources:
        </Typography>
        <Box my={ 4 }>
          <List className={ classes.moiList } dense={ true }>
            {
              props.sourceMetrics.map((metric) => 
                (
                  <ListItem key={metric.source}>
                     <ListItemText key={metric.source}>{metric.source} {metric.sourceCount}</ListItemText>
                  </ListItem>
                )
              )
            }
          </List>

          <Bar
            data={ chartData }
            options={{
              title:{
                display:true,
                text:'How Members Found Us',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}

OutputArea.propTypes = {
  sourceMetrics: PropTypes.array.isRequired
};