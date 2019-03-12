import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

// utils
import { Link } from "@reach/router";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = theme => ({
  root: {
    width: "100%",
    height: 90,
    position: "fixed",
    bottom: 0,
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
  const [value, setValue] = React.useState("home");
  console.log(value);
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Info"
        value="info"
        icon={
          <NavLink to="info" theme={theme}>
            <FontAwesomeIcon icon={["fal", "info-circle"]} size="2x" />
          </NavLink>
        }
        // onClick={() => navigate("info")}
      />

      <BottomNavigationAction
        label="Home"
        value="home"
        icon={
          <NavLink to="./" theme={theme}>
            <FontAwesomeIcon icon={["fal", "home"]} size="2x" />
          </NavLink>
        }
      />
      <BottomNavigationAction
        label="Forecast"
        value="forecast"
        icon={
          <NavLink to="forecast" theme={theme}>
            <FontAwesomeIcon icon={["fal", "cloud"]} size="2x" />
          </NavLink>
        }
      />
      <BottomNavigationAction
        label="Lawns"
        value="lawns"
        icon={
          <NavLink to="lawns" theme={theme}>
            <FontAwesomeIcon icon={["fal", "th-list"]} size="2x" />
          </NavLink>
        }
      />
    </BottomNavigation>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Nav)));
