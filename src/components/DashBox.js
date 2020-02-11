import React from 'react'

export default class DashBox extends React.Component {
    render() {
        return (
            <div className="Dashbox">
            <div className="Box">
                <p className="Label">Last Updated</p>
                <p className="Data">Feb 10, 2020</p>
            </div>
            <div className="Box">
                <p className="Label">Total Cases</p>
                <p className="Data">42542</p>
            </div>
            <div className="Box">
                <p className="Label">Total Fatalities</p>
                <p className="Data">1018</p>
            </div>
            </div>
        )
    }
}