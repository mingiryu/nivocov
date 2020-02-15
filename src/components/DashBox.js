import React from 'react'

export default class DashBox extends React.Component {
    render() {
        let total_confirmed = localStorage.getItem("total_confirmed");
        let total_fatalities = localStorage.getItem("total_fatalities");
        let total_recovered = localStorage.getItem("total_recovered");
        
        let date = new Date()

        return (
            <div className="Dashbox">
                <div className="Box">
                    <p className="Label">Last Updated</p>
                    <p className="Data">{date.toLocaleString('default', { month: 'short' })} {date.getDate()}, {date.getFullYear()}</p>
                </div>
                <div className="Box">
                    <p className="Label">Total Confirmed</p>
                    <p className="Data">{ total_confirmed }</p>
                </div>
                <div className="Box">
                    <p className="Label">Total Fatalities</p>
                    <p className="Data">{ total_fatalities }</p>
                </div>
                <div className="Box">
                <p className="Label">Total Recovered</p>
                    <p className="Data">{ total_recovered }</p>
                </div>
            </div>
        )
    }
}