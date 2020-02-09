import React from 'react'

export default class DashBox extends React.Component {
    render() {
        return (
            <div className="Dashbox">
            <div className="Box">
                <p className="Label">Last Updated</p>
                <p className="Data">Feb 8, 2020</p>
            </div>
            <div className="Box">
                <p className="Label">Total Cases</p>
                <p className="Data">34768</p>
            </div>
            <div className="Box">
                <p className="Label">Total Fatalities</p>
                <p className="Data">725</p>
            </div>
            </div>
        )
    }
}