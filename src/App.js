import React from "react";
import { Router } from "@reach/router";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "./withRoot";

// context
import AppContext from "./context/appContext";

// common styles
import { mainContainer } from "./styles/common";

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
  faHome as falHome,
  faInfoCircle as falInfoCircle,
  faThList as falThList,
  faCloud as falCloud,
  faEllipsisH as falEllipsisH,
  faPlusCircle,
  faMoon as fasMoon,
  faFog as fasFog,
  faWind as fasWind,
  faCloudSun as fasCloudSun,
  faCloudMoon as fasCloudMoon,
  faSnowflakes as fasSnowflakes,
  faCloudSleet as fasCloudSleet,
  faClouds as fasClouds,
  faSun as fasSun,
  faCloudRain as falCloudRain
} from "@fortawesome/pro-light-svg-icons";
import {
  faTint,
  faHome,
  faInfoCircle,
  faThList,
  faCloud,
  faEllipsisH,
  faMoon,
  faFog,
  faWind,
  faCloudSun,
  faCloudMoon,
  faSnowflakes,
  faCloudSleet,
  faClouds,
  faSun,
  faCloudRain,
  faRaindrops
} from "@fortawesome/pro-solid-svg-icons";
library.add(
  faHome,
  faInfoCircle,
  faThList,
  faCloud,
  faChevronLeft,
  faTint,
  faEllipsisH,
  falHome,
  falInfoCircle,
  falThList,
  falCloud,
  falEllipsisH,
  faPlusCircle,
  fasMoon,
  fasFog,
  fasWind,
  fasCloudSun,
  fasCloudMoon,
  fasSnowflakes,
  fasCloudSleet,
  fasClouds,
  fasSun,
  falCloudRain,
  faMoon,
  faFog,
  faWind,
  faCloudSun,
  faCloudMoon,
  faSnowflakes,
  faCloudSleet,
  faClouds,
  faSun,
  faCloudRain,
  faRaindrops
);

const styles = () => ({
  mainContainer: { ...mainContainer }
});

const App = ({ classes }) => {
  const { loading } = React.useContext(AppContext);
  return (
    <div className={classes.mainContainer}>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <Landing path="/" />
          <Location path="location" />
          <IrrigationDate path="irrigationDate" />
          <Sprinkler path="sprinkler" />
          <Info path="info" />
          <Lawn path="home" />
          <Forecast path="forecast" />
          <LawnList path="lawns" />
        </Router>
      )}
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(App)));
