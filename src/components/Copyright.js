import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 200,
    },
  },

  moiCopyright: {
    marginBottom: 15,
  },

}))

export default function Copyright() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography className={ classes.moiCopyright } variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://chingu.io/">
          Chingu, Inc.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </React.Fragment>
  )
}
