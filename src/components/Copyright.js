import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://chingu.io/">
          Chingu, Inc.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </React.Fragment>
  );
}
