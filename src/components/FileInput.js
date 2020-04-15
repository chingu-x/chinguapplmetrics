import React from 'react'
import PropTypes from 'prop-types'; 
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 200,
    },
  },

  moiButton: {
    marginTop: 10,
    marginRight: 10,
  },

  moiLabel: {
    marginTop: 60,
  },

  moiFormLabel: {
    marginRight: 5,
  }

}))

export default function FileInput(props) {
  const classes = useStyles()
  let fileInput = React.createRef()
  
  // Update the file name when the user clicks the 'Get Appls' button
  const handleGetAppls = (event) => {
    event.preventDefault()
    const file = fileInput.current.files[0]
    const textType = /text.*/
    
    if (file !== undefined && file.type.match(textType)) {
      const reader = new FileReader()
      
      reader.onload = function(e) {
          const fileContents = reader.result
          props.updateFileContents(fileContents)
      }
      
      reader.readAsText(file)
    } else {
      console.log('File type is not supported')
    }
  }

  return (
    <FormControl className={ classes.root } noValidate autoComplete="off">
      <span className={ classes.moiLabel }>
        <FormLabel className={ classes.moiFormLabel }>
          Upload file:
        </FormLabel>
        <input type="file" ref={ fileInput } />
      </span>
      <Button className={ classes.moiButton } variant="contained" size="medium"color="primary"
        onClick={ handleGetAppls }>
        Get Sources
      </Button>
    </FormControl>
  )
}

FileInput.propTypes = {
  sourceMetrics: PropTypes.func.isRequired
}