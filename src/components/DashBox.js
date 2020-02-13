import React from 'react'

export default class DashBox extends React.Component {
    render() {
        return (
            <div className="Dashbox">
                <div className="Box">
                    <p className="Label">Last Updated</p>
                    <p className="Data">Feb 12, 2020</p>
                </div>
                <div className="Box">
                    <p className="Label">Total Confirmed</p>
                    <p className="Data">60093</p>
                </div>
                <div className="Box">
                    <p className="Label">Total Fatalities</p>
                    <p className="Data">1369</p>
                </div>
                <div className="Box">
                <p className="Label">Total Recovered</p>
                    <p className="Data">6017</p>
                </div>
            </div>
        )
    }
}