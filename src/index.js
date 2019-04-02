import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

// material-ui-picker
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

import { AppProvider } from "./context/appContext";

import ReactGA from "react-ga";
ReactGA.initialize("UA-137506548-1");
ReactGA.pageview(window.location.pathname + window.location.search);
ReactGA.event({
  category: "User",
  action: "Sent message"
});

function Root() {
  return (
    <AppProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </AppProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
