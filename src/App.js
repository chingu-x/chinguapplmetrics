import React, { useState, useEffect } from 'react'
import './App.css';
import { Helmet } from "react-helmet"
import Copyright from './components/Copyright'
import InputArea from './containers/InputArea'
import OutputArea from './containers/OutputArea'
import TopBar from './containers/TopBar'
import createSourceJson from './util/createSourceJson'

const App = () => {
  const [fileContents, setfileContents] = useState('')
  const [sourceJSON, setSourceJSON] = useState()
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const updateFileContents = async (fileContents) => {
    setfileContents(fileContents)
    setSourceJSON()
  }

  useEffect(() => {
    if (fileContents !== '') {
      setSourceJSON(createSourceJson(fileContents))
      setIsDataLoaded(true)
    }
  },[fileContents, setIsDataLoaded])

  return (
    <div className="App">
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <TopBar />

      <main>
        <InputArea updateFileContents={ updateFileContents } />
        { isDataLoaded
            ? (<OutputArea sourceMetrics={ sourceJSON } />)
            : (' ')
        }
      </main>

      <footer>
        <Copyright />
      </footer>
    </div>
  );
}

export default App;
