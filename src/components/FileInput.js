import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 200,
    },
  },
  moiButton: {
    marginRight: 10,
  },
  moiTextField: {
    marginTop: 60,
  },
}))

export default function FileInput(props) {
  const classes = useStyles()
  const defaultFieldValue = 'Enter file name'
  const [fileName, setFileName] = React.useState(defaultFieldValue)

  // Process a request to cancel the entry of the Chingu Application csv file name
  const handleClear = (event) => {
    setFileName(defaultFieldValue)
    if (props.updateFileName !== undefined) {
      props.updateFileName('')
    }
  }
  
  // Update the file name when the user clicks the 'Get Appls' button
  const handleGetAppls = (event) => {
    props.updateFileName(fileName)
  }
  
  // Clear the file name field when it comes into focus
  const clickInFileName = (event) => {
    setFileName('')
  }

  // Update the file name when the user types into it
  const changeInFileName = (event) => {
    setFileName(event.target.value)
  }

  // Intercept the press of the Enter key in the file name field
  const keydownInFileName = (event) => {
      // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
      if (event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
        props.updateFileName(fileName)
      }
  }

  return (
    <form className={ classes.root } noValidate autoComplete="off">
      <div className={ classes.moiTextField }>
        <TextField
          required
          id="filled-required"
          label="Required"
          variant="filled"
          value={ fileName }
          onKeyDown={ keydownInFileName }
          onClick={ clickInFileName }
          onChange={ changeInFileName }
        />
      </div>
      <div>
        <Button className={ classes.moiButton } variant="contained" size="medium"
          onClick={ handleClear }>
          Clear
        </Button>
        <Button className={ classes.root } variant="contained" size="medium"color="primary"
          onClick={ handleGetAppls }>
          Get Appls
        </Button>
      </div>
    </form>
  );
}