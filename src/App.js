import React, { useState, useEffect } from 'react'
import './App.css';
import { Helmet } from "react-helmet"
import Copyright from './components/Copyright'
import InputArea from './containers/InputArea'
import OutputArea from './containers/OutputArea'
import TopBar from './containers/TopBar'

const App = () => {
  const [fileContents, setfileContents] = useState('')
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const updateFileContents = async (fileContents) => {
    setfileContents(fileContents)
  }

  useEffect(() => {
    async function fetchData() {
      if (fileContents !== '') {
        setIsDataLoaded(true)
      }
    }
    fetchData();

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
            ? (<OutputArea fileContents={ fileContents } /> )
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
