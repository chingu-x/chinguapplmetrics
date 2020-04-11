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
        </Box>
      </Container>
    </React.Fragment>
  );
}

OutputArea.propTypes = {
  sourceMetrics: PropTypes.array.isRequired
};