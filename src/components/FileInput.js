import React from 'react'
import PropTypes from 'prop-types'; 
import Button from '@material-ui/core/Button'
//import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 200,
    },
  },

  moiContainer: {
    marginTop: 45,
    textAlign: 'center',
  },

  moiButtonContainer: {
    marginTop: 10,
    textAlign: 'center',
  },

  moiButton: {
    marginRight: 10,
    width: '10rem',
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
    <FormControl noValidate autoComplete="off">
      <Container className={ classes.moiContainer }>
        <span>
          <FormLabel className={ classes.moiFormLabel }>
            Upload file:
          </FormLabel>
          <input type="file" ref={ fileInput } />
        </span>
      </Container>
      <Container className={ classes.moiButtonContainer }>
        <Button className={ classes.moiButton } variant="contained" size="medium"color="primary"
          onClick={ handleGetAppls }>
          Chart It!
        </Button>
      </Container>
    </FormControl>
  )
}

FileInput.propTypes = {
  updateFileContents: PropTypes.func.isRequired
}