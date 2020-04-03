import React from "react";
const GITHUB = "https://github.com/mingir2";
const JHU = "https://github.com/CSSEGISandData/COVID-19";

const Header = () => (
    <div>
        <h1>Exploration of novel coronavirus</h1>
        <p>
            Maintained by <a href={GITHUB}>Mingi Ryu</a>. Enabled by data from{" "}
            <a href={JHU}>Johns Hopkins</a>.
        </p>
    </div>
)
export default Header;
