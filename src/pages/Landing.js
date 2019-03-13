import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

// components
import ButtonLink from "../components/ButtonLink";

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
    marginBottom: theme.spacing.unit * 4
  },
  smallTextTop: {
    padding: 16,
    background: theme.palette.primary.main,
    color: "white",
    marginBottom: theme.spacing.unit * 4
  },
  smallTextBottom: {
    padding: 16,
    marginBottom: theme.spacing.unit * 4
  }
});

const Landing = ({ classes }) => {
  return (
    <div className={classes.root}>
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
          Calculator
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

      <Typography
        variant="body2"
        align="center"
        className={classes.smallTextBottom}
      >
        To ensure a healthy lawn, use less water and save money please follow
        the simple but scientific guidance
      </Typography>

      <ButtonLink
        to="/location"
        variant="outlined"
        color="primary"
        size="large"
      >
        Get Started
      </ButtonLink>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Landing)));
