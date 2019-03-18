import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// utils
import { Link } from "@reach/router";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContext from "../context/appContext";

const styles = theme => ({
  root: {
    height: 90,
    opacity: 0.95,
    display: "flex",
    alignItems: "flex-start"
  }
});

const NavLink = props => {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          style: {
            color: isCurrent
              ? props.theme.palette.primary.main
              : props.theme.palette.grey["700"]
          }
        };
      }}
    />
  );
};

const Nav = ({ classes, theme }) => {
  const { navPath, setNavPath } = React.useContext(AppContext);
  function handleChange(event, newValue) {
    setNavPath(newValue);
  }
  console.log(navPath);
  return (
    <BottomNavigation
      value={navPath === "" ? "home" : navPath}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Info"
        value="info"
        icon={
          <NavLink to="/info" theme={theme}>
            {navPath === "info" ? (
              <FontAwesomeIcon icon={["fa", "info-circle"]} size="2x" />
            ) : (
              <FontAwesomeIcon icon={["fal", "info-circle"]} size="2x" />
            )}
          </NavLink>
        }
      />

      <BottomNavigationAction
        label="Home"
        value="home"
        icon={
          <NavLink to="/home" theme={theme}>
            {navPath === "home" || navPath === "" ? (
              <FontAwesomeIcon icon={["fa", "home"]} size="2x" />
            ) : (
              <FontAwesomeIcon icon={["fal", "home"]} size="2x" />
            )}
          </NavLink>
        }
      />
      <BottomNavigationAction
        label="Forecast"
        value="forecast"
        icon={
          <NavLink to="/forecast" theme={theme}>
            {navPath === "forecast" ? (
              <FontAwesomeIcon icon={["fa", "cloud"]} size="2x" />
            ) : (
              <FontAwesomeIcon icon={["fal", "cloud"]} size="2x" />
            )}
          </NavLink>
        }
      />
      <BottomNavigationAction
        label="Lawns"
        value="lawns"
        icon={
          <NavLink to="/lawns" theme={theme}>
            {navPath === "lawns" ? (
              <FontAwesomeIcon icon={["fa", "th-list"]} size="2x" />
            ) : (
              <FontAwesomeIcon icon={["fal", "th-list"]} size="2x" />
            )}
          </NavLink>
        }
      />
    </BottomNavigation>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Nav)));
