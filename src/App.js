import React, { useState, useEffect } from 'react'
import './App.css';
import { Helmet } from "react-helmet"
import Copyright from './components/Copyright'
import InputArea from './containers/InputArea'
import OutputArea from './containers/OutputArea'
import TopBar from './containers/TopBar'
import createSourceJson from './util/createSourceJson'

const App = () => {
  const [fileName, setfileName] = useState('')
  const [sourceJSON, setSourceJSON] = useState()
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const updateFileName = async (fileName) => {
    setfileName(fileName)
    setSourceJSON()
    const sourceMetrics = createSourceJson()
    console.log(sourceMetrics)
  }

  function getAllAppls(fileName) {

  }

  useEffect(() => {
    if (fileName !== '') {
      setSourceJSON(getAllAppls(fileName))
      setIsDataLoaded(true)
    }
  },[fileName, setIsDataLoaded])

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
        <InputArea updateFileName={ updateFileName } />
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
