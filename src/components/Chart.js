import React from "react";
import "./Chart.css";
import * as d3 from "d3";

import Header from "./Header"
import BarChart from "./BarChart";
import Choropleth from "./Choropleth";
import LineChart from "./LineChart";
import StreamChart from "./StreamChart"

const BASE_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/";
const CONFIRMED_URL = BASE_URL + "time_series_covid19_confirmed_global.csv";
const DEATHS_URL = BASE_URL + "time_series_covid19_deaths_global.csv";
const RECOVERED_URL = BASE_URL + "time_series_covid19_recovered_global.csv";
const DAILY_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/";

let TODAY = new Date();

class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: null,
            confirmed: null,
            deaths: null,
            recovered: null,
            daily: null,
            country: "China",
            type: "Confirmed",
            scale: "linear"
        };

        this.fetchData();
    }

    updateCountry = (name) => {
        this.setState({ country: name })
    }

    getDailyUrl() {
        return `${DAILY_URL}${("0" + (TODAY.getMonth() + 1)).slice(-2) + "-" + ("0" + TODAY.getDate()).slice(-2) + "-" + TODAY.getFullYear()}${".csv"}`;
    }

    fetchData() {
        d3.csv(CONFIRMED_URL).then(d =>
            this.setState({
                confirmed: d,
                columns: d.columns
            })
        );
        d3.csv(DEATHS_URL).then(d => this.setState({ deaths: d }));
        d3.csv(RECOVERED_URL).then(d => this.setState({ recovered: d }));
        d3.csv(this.getDailyUrl())
            .then(d => this.setState({ daily: d }))
            .catch(err => {
                // Get yesterday's data if today fails
                TODAY.setDate(TODAY.getDate() - 1);
                d3.csv(this.getDailyUrl())
                    .then(d => this.setState({ daily: d }));
            });
    }

    render() {
        if (!this.state.confirmed || !this.state.deaths || !this.state.recovered || !this.state.daily) {
            return null;
        }

        return (
            <div className="two">
                <BarChart data={this.state.daily} updateCountry={this.updateCountry}></BarChart>
                <div>
                    <Header></Header>
                    <div className="buttonGroup">
                        <button onClick={() => this.setState({ type: "Confirmed" })}>Confirmed</button>
                        <button onClick={() => this.setState({ type: "Recovered" })}>Recovered</button>
                        <button onClick={() => this.setState({ type: "Deaths" })}>Deaths</button>
                    </div>
                    <Choropleth data={this.state.daily} type={this.state.type} updateCountry={this.updateCountry}></Choropleth>
                    <div className="buttonGroup">
                        <button onClick={() => this.setState({ scale: "linear" })}>Linear</button>
                        <button onClick={() => this.setState({ scale: "log" })}>Log</button>
                    </div>
                    <LineChart
                        confirmed={this.state.confirmed}
                        recovered={this.state.recovered}
                        deaths={this.state.deaths}
                        columns={this.state.columns}
                        country={this.state.country}
                        scale={this.state.scale}>
                    </LineChart>
                    <StreamChart
                        confirmed={this.state.confirmed}
                        recovered={this.state.recovered}
                        deaths={this.state.deaths}
                        columns={this.state.columns}
                        country={this.state.country}>
                    </StreamChart>
                </div>
            </div>
        )
    }
}
export default Chart;
