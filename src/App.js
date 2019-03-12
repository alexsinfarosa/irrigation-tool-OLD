import React from "react";
import { Router } from "@reach/router";

// components
import Landing from "./pages/Landing";
import Location from "./pages/Location";
import IrrigationDate from "./pages/IrrigationDate";
import Sprinkler from "./pages/Sprinkler";

const App = () => {
  return (
    <Router>
      <Landing path="/" />
      <Location path="location" />
      <IrrigationDate path="irrigationDate" />
      <Sprinkler path="sprinkler" />
    </Router>
  );
};

export default App;
