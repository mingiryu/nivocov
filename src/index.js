import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import getData from "./components/Data";

getData()
  .then(data => {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("data", JSON.stringify(data));
      ReactDOM.render(<App />, document.getElementById("root"));
    } else {
      console.log("Sorry, your browser does not support Web Storage...");
      alert("Sorry, your browser does not support Web Storage...");
    }
  })
  .catch(error => {
    console.error(error);
    alert(error);
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
