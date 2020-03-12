import React from "react";
import * as d3 from "d3";
import "./App.css";

import BarChart from "./components/BarChart"
import Choropleth from "./components/Choropleth";
import LineChart from "./components/LineChart";

const BASE_URL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/";
const CONFIRMED_URL = BASE_URL + "time_series_19-covid-Confirmed.csv";
const DEATHS_URL = BASE_URL + "time_series_19-covid-Deaths.csv";
const RECOVERED_URL = BASE_URL + "time_series_19-covid-Recovered.csv";
const DAILY_URL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/";

let TODAY = new Date();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      today: null,
      columns: null,
      confirmed: null,
      deaths: null,
      recovered: null,
      daily: null
    };

    this.fetchData();
  }

  getDailyUrl() {
    return `${DAILY_URL}${("0" + (TODAY.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + TODAY.getDate()).slice(-2) +
      "-" +
      TODAY.getFullYear()}${".csv"}`;
  }

  fetchData() {
    d3.csv(CONFIRMED_URL).then(d =>
      this.setState({
        confirmed: d,
        columns: d.columns,
        today: d.columns.slice(-1)[0]
      })
    );
    d3.csv(DEATHS_URL).then(d => this.setState({ deaths: d }));
    d3.csv(RECOVERED_URL).then(d => this.setState({ recovered: d }));
    d3.csv(this.getDailyUrl())
      .then(d => this.setState({ daily: d }))
      .catch(err => {
        // Get yesterday's data if today fails
        TODAY.setDate(TODAY.getDate() - 1);
        d3.csv(this.getDailyUrl()).then(d => this.setState({ daily: d }));
      });
  }

  render() {
    if (
      !this.state.confirmed ||
      !this.state.deaths ||
      !this.state.recovered ||
      !this.state.daily
    )
      return null;

    return (
      <div className="App">
        <div className="header">COVID-19: Novel Coronavirus Data Visualization</div>
        <BarChart data={{data: this.state.daily }}></BarChart>
        <Choropleth data={{ data: this.state.daily }}></Choropleth>
        <div className="two">
          <div className="chart">
            <p>Hubei, China</p>
            <LineChart
              data={{
                ...this.state,
                country: "China",
                province: "Hubei"
              }}
            ></LineChart>
          </div>
          <div className="chart">
            <p>Italy</p>
            <LineChart
              data={{ ...this.state, country: "Italy", province: "" }}
            ></LineChart>
          </div>
          <div className="chart">
            <p>Korea, South</p>
            <LineChart
              data={{ ...this.state, country: "Korea, South", province: "" }}
            ></LineChart>
          </div>
          <div className="chart">
            <p>Iran</p>
            <LineChart
              data={{ ...this.state, country: "Iran", province: "" }}
            ></LineChart>
          </div>
          <div className="chart">
            <p>Cook County, IL, US</p>
            <LineChart
              data={{ ...this.state, country: "US", province: "Cook County, IL" }}
            ></LineChart>
          </div>
          <div className="chart">
            <p>Los Angeles, CA, US</p>
            <LineChart
              data={{ ...this.state, country: "US", province: "Los Angeles, CA" }}
            ></LineChart>
          </div>
        </div>
        <div className="footer"><a href="https://github.com/CSSEGISandData/COVID-19">Data from Johns Hopkins CSSE</a></div>
      </div>
    );
  }
}
export default App;
