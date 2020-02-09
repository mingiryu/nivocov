import React from 'react';
import Sunburst from './components/Sunburst'
import Bubble from './components/Bubble'
import Choropleth from './components/Choropleth';
import DashBox from './components/DashBox'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">2019-nCoV: Confirmed cases of Cronoavirus by country and region</h1>
      </header>

      <div className="Dashboard">
        <DashBox />
        <div className="Chart" id="sunburst">
          <Sunburst />
        </div>
        <div className="Chart" id="bubble">
          <Bubble />
        </div>
        <div className="Chart" id="choropleth">
          <Choropleth />
        </div>
      </div>
    </div>
  );
}

export default App;
