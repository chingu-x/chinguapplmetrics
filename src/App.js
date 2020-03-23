import React from 'react';
import './App.css';
import Copyright from './components/Copyright'
import OutputArea from './containers/OutputArea'
import TopBar from './containers/TopBar'

function App() {
  return (
    <div className="App">
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <TopBar />

      <main>
        <OutputArea />
      </main>

      <footer>
        <Copyright />
      </footer>
    </div>
  );
}

export default App;
