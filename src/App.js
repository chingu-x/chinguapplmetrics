import React, { useState, useEffect } from 'react'
import './App.css';
import { Helmet } from "react-helmet"
import Copyright from './components/Copyright'
import InputArea from './containers/InputArea'
import OutputArea from './containers/OutputArea'
import TopBar from './containers/TopBar'
import createSourceMetrics from './util/createSourceMetrics'
import createPriorMemberMetrics from './util/createPriorMemberMetrics'

const App = () => {
  const [fileContents, setfileContents] = useState('')
  const [sourceJSON, setSourceJSON] = useState()
  const [priorMemberJSON, setPriorMemberJSON] = useState()
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const updateFileContents = async (fileContents) => {
    setfileContents(fileContents)
  }

  useEffect(() => {
    async function fetchData() {
      if (fileContents !== '') {
        setSourceJSON(await createSourceMetrics(fileContents))
        setPriorMemberJSON(await createPriorMemberMetrics(fileContents))
        setIsDataLoaded(true)
      }
    }
    fetchData();

  },[fileContents, setSourceJSON, setIsDataLoaded])

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
            ? (<OutputArea sourceMetrics={ sourceJSON } priorMemberMetrics={ priorMemberJSON } /> )
            : (' ')
        }
      </main>

      <footer>
        <Copyright />
      </footer>
    </div>
  )
}

export default App
