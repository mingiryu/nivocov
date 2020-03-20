import React from "react";
import "./App.css";

import Chart from './components/Chart'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>NivoCoV: COVID-19 Data Visualization</h1>
        <Chart></Chart>
        <h2><a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">Data from Johns Hopkins</a></h2>
      </div>
    );
  }
}
export default App;
