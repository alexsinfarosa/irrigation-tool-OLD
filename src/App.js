import React from "react";
import { Router } from "@reach/router";

// context
import { AppContext } from "./context/appContext";

// components
import Loading from "./components/Loading";
import Landing from "./pages/Landing";
import Location from "./pages/Location";
import IrrigationDate from "./pages/IrrigationDate";
import Sprinkler from "./pages/Sprinkler";
import Main from "./pages/Main";
import Info from "./pages/Info";
import Lawn from "./pages/Lawn";
import Forecast from "./pages/Forecast";
import LawnList from "./pages/LawnList";

// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import {
  faHome,
  faInfoCircle,
  faThList,
  faCloud
} from "@fortawesome/pro-light-svg-icons";
library.add(faHome, faInfoCircle, faThList, faCloud, faChevronLeft);

const App = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {loading ? (
          <Loading />
        ) : (
          <Router>
            <Landing path="/" />
            <Location path="location" />
            <IrrigationDate path="irrigationDate" />
            <Sprinkler path="sprinkler" />

            <Main path="main">
              <Info path="info" />
              <Lawn path="/" />
              <Forecast path="forecast" />
              <LawnList path="lawns" />
            </Main>
          </Router>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
