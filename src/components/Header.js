import React from "react"
import "./Header.css"

class Header extends React.Component {
    render() {
        const GITHUB = "https://github.com/mingir2"
        const JHU = "https://github.com/CSSEGISandData/COVID-19"
        return (
            <div>
                <h1>Exploration of Novel Coronavirus</h1>
                <p>Maintained by <a href={GITHUB}>Mingi Ryu</a>. Enabled by data from <a href={JHU}>Johns Hopkins</a>.</p>
            </div>
        )
    }
}
export default Header