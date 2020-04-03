import React from "react";
import * as d3 from "d3";

import Header from "./Header";
import BarChart from "./BarChart";
import Choropleth from "./Choropleth";
import LineChart from "./LineChart";
import StreamChart from "./StreamChart";
import COVIDContext from "./COVIDContext";

const DAILY_GET_API =
    "https://api.github.com/repos/CSSEGISandData/COVID-19/git/trees/d3fd355cb4008681bf8384bbf6fa72a1bea7723f";
const BASE_RAW_URL =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/";
const TIMESERIES_DIR = "csse_covid_19_time_series/";
const DAILY_DIR = "csse_covid_19_daily_reports/";
const CONFIRMED_FILE = "time_series_covid19_confirmed_global.csv";
const DEATHS_FILE = "time_series_covid19_deaths_global.csv";
const RECOVERED_FILE = "time_series_covid19_recovered_global.csv";

class Chart extends React.Component {
    static contextType = COVIDContext;

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
    }

    updateCountry = name => {
        this.setState({ country: name });
    };

    /* getDailyPath: a robust method to get the filename of the latest daily report.
     *
     * GET request to get the list of filenames on the target Github repo directory.
     * Parse the JSON to get the name of the latest daily report.
     * Return the complete absolute URL for that file to be used for d3.csv() fetch.
     */
    getDailyPath() {
        const requestOptions = {
            method: "GET"
        };

        return fetch(DAILY_GET_API, requestOptions)
            .then(response => response.json())
            .then(json => {
                const secondToLast = json.tree.slice(-2)[0];
                const latestDailyPath = secondToLast.path;
                return `${BASE_RAW_URL}${DAILY_DIR}${latestDailyPath}`;
            });
    }

    fetchData() {
        d3.csv(`${BASE_RAW_URL}${TIMESERIES_DIR}${CONFIRMED_FILE}`).then(d =>
            this.setState({
                confirmed: d,
                columns: d.columns
            })
        );
        d3.csv(`${BASE_RAW_URL}${TIMESERIES_DIR}${DEATHS_FILE}`).then(d =>
            this.setState({ deaths: d })
        );
        d3.csv(`${BASE_RAW_URL}${TIMESERIES_DIR}${RECOVERED_FILE}`).then(d =>
            this.setState({ recovered: d })
        );
    }

    componentDidMount() {
        this.getDailyPath()
            .then(path => d3.csv(path))
            .then(csv => this.setState({ daily: csv }));
        this.fetchData();
    }

    render() {
        if (!this.state.daily) {
            return null;
        }

        return (
            <COVIDContext.Provider
                value={{
                    columns: this.state.columns,
                    confirmed: this.state.confirmed,
                    deaths: this.state.deaths,
                    recovered: this.state.recovered,
                    daily: this.state.daily,
                    country: this.state.country,
                    type: this.state.type,
                    scale: this.state.scale
                }}
            >
                <div className="two">
                    <BarChart updateCountry={this.updateCountry}></BarChart>
                    <div>
                        <Header></Header>
                        <div className="buttonGroup">
                            <button
                                onClick={() =>
                                    this.setState({ type: "Confirmed" })
                                }
                            >
                                Confirmed
                            </button>
                            <button
                                onClick={() =>
                                    this.setState({ type: "Recovered" })
                                }
                            >
                                Recovered
                            </button>
                            <button
                                onClick={() =>
                                    this.setState({ type: "Deaths" })
                                }
                            >
                                Deaths
                            </button>
                        </div>
                        <Choropleth
                            updateCountry={this.updateCountry}
                        ></Choropleth>
                        <div className="buttonGroup">
                            <button
                                onClick={() =>
                                    this.setState({ scale: "linear" })
                                }
                            >
                                Linear
                            </button>
                            <button
                                onClick={() => this.setState({ scale: "log" })}
                            >
                                Log
                            </button>
                        </div>
                        <LineChart></LineChart>
                        <StreamChart></StreamChart>
                    </div>
                </div>
            </COVIDContext.Provider>
        );
    }
}
export default Chart;
