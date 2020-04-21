import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import PriorMembers from '../components/PriorMembers'
import MembersByMonth from '../components/MembersByMonth'
import MembersBySource from '../components/MembersBySource'

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

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={ classes.moiContainer } maxWidth="lg">
        <PriorMembers fileContents={ props.fileContents } />
        <MembersByMonth fileContents={ props.fileContents } />
        <MembersBySource sourceMetrics={ props.sourceMetrics } />
      </Container>
    </React.Fragment>
  )
}

OutputArea.propTypes = {
  sourceMetrics: PropTypes.array.isRequired,
  fileContents: PropTypes.string.isRequired,
}