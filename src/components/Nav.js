import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// utils
import { navigate } from "@reach/router";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContext from "../context/appContext";

const styles = () => ({
  root: {
    height: 90,
    opacity: 0.95,
    display: "flex",
    alignItems: "flex-start"
  }
});

const Nav = React.memo(({ classes }) => {
  const { navPath, setNavPath } = React.useContext(AppContext);
  function handleChange(event, newValue) {
    setNavPath(newValue);
  }
  // console.log(navPath);
  return (
    <BottomNavigation
      value={navPath}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Info"
        value="info"
        onClick={() => navigate("/info")}
        icon={
          navPath === "info" ? (
            <FontAwesomeIcon icon={["fa", "info-circle"]} size="2x" />
          ) : (
            <FontAwesomeIcon icon={["fal", "info-circle"]} size="2x" />
          )
        }
      />

      <BottomNavigationAction
        label="Home"
        value="home"
        onClick={() => navigate("/home")}
        icon={
          navPath === "home" ? (
            <FontAwesomeIcon icon={["fa", "home"]} size="2x" />
          ) : (
            <FontAwesomeIcon icon={["fal", "home"]} size="2x" />
          )
        }
      />
      <BottomNavigationAction
        label="Forecast"
        value="forecast"
        onClick={() => navigate("/forecast")}
        icon={
          navPath === "forecast" ? (
            <FontAwesomeIcon icon={["fa", "cloud"]} size="2x" />
          ) : (
            <FontAwesomeIcon icon={["fal", "cloud"]} size="2x" />
          )
        }
      />
      <BottomNavigationAction
        label="Lawns"
        value="lawns"
        onClick={() => navigate("/lawns")}
        icon={
          navPath === "lawns" ? (
            <FontAwesomeIcon icon={["fa", "th-list"]} size="2x" />
          ) : (
            <FontAwesomeIcon icon={["fal", "th-list"]} size="2x" />
          )
        }
      />
    </BottomNavigation>
  );
});

export default withRoot(withStyles(styles)(withTheme()(Nav)));
