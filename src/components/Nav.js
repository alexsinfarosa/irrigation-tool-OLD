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
    maxWidth: 640,
    margin: "0 auto",
    height: 90,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.95,
    display: "flex",
    alignItems: "flex-start"
  }
});

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          color: isCurrent
            ? props.theme.palette.grey["700"]
            : props.theme.palette.grey["700"]
        }
      };
    }}
  />
);

const Nav = ({ classes, theme }) => {
  const { navPath, setNavPath } = React.useContext(AppContext);
  console.log(navPath);
  function handleChange(event, newValue) {
    setNavPath(newValue);
  }

  return (
    <BottomNavigation
      value={navPath === "" ? "main" : navPath}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Info"
        value="info"
        icon={
          <NavLink to="info" theme={theme}>
            {navPath === "info" ? (
              <FontAwesomeIcon
                icon={["fa", "info-circle"]}
                size="2x"
                color={theme.palette.primary.main}
              />
            ) : (
              <FontAwesomeIcon icon={["fal", "info-circle"]} size="2x" />
            )}
          </NavLink>
        }
        // onClick={() => navigate("info")}
      />

      <BottomNavigationAction
        label="Home"
        value="main"
        icon={
          <NavLink to="./" theme={theme}>
            {navPath === "main" || navPath === "" ? (
              <FontAwesomeIcon
                icon={["fa", "home"]}
                size="2x"
                color={theme.palette.primary.main}
              />
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
          <NavLink to="forecast" theme={theme}>
            {navPath === "forecast" ? (
              <FontAwesomeIcon
                icon={["fa", "cloud"]}
                size="2x"
                color={theme.palette.primary.main}
              />
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
          <NavLink to="lawns" theme={theme}>
            {navPath === "lawns" ? (
              <FontAwesomeIcon
                icon={["fa", "th-list"]}
                size="2x"
                color={theme.palette.primary.main}
              />
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
