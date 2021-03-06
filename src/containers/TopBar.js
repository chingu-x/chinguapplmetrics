import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default function TopBar() {

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Chingu Application Metrics
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}