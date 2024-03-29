import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

// components
import ButtonLink from "../components/ButtonLink";
import Logos from "../components/Logos";

// utils
import { buttonBig } from "../styles/common";

const styles = theme => ({
  root: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    color: theme.palette.text.secondary,
    fontWeight: "700",
    marginBottom: 64
  },
  smallTextTop: {
    padding: 16,
    background: theme.palette.primary.main,
    color: "white",
    marginBottom: 64
  },
  smallTextBottom: {
    padding: 16,
    marginBottom: 64
  }
});

const Landing = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div
        style={{
          width: "90%",
          marginBottom: 64
        }}
      >
        <Logos />
      </div>
      <div className={classes.titleText}>
        <Typography
          color="inherit"
          component="h1"
          variant="h4"
          align="left"
          gutterBottom
        >
          Lawn
        </Typography>
        <Typography
          color="inherit"
          component="h1"
          variant="h4"
          align="left"
          gutterBottom
        >
          Irrigation
        </Typography>
        <Typography
          color="inherit"
          component="h1"
          variant="h4"
          align="left"
          gutterBottom
        >
          Tool
        </Typography>

        <Typography variant="h6" color="error">
          (ßeta release)
        </Typography>
      </div>

      <Typography
        color="inherit"
        variant="body2"
        align="center"
        className={classes.smallTextTop}
      >
        You can find out your watering needs for today and the next two days
      </Typography>

      <ButtonLink
        to="/location"
        variant="outlined"
        color="primary"
        style={{ ...buttonBig }}
      >
        Get Started
      </ButtonLink>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Landing)));
