import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

// components
import Nav from "../components/Nav";

// common styles
import { main } from "../styles/common";

const styles = theme => ({
  main: { ...main },
  li: {
    color: "rgba(0,0,0,0.8)",
    fontSize: "0.8rem",
    listStyle: "square"
  },
  a: {
    // textDecoration: "none",
    color: theme.palette.secondary.main
  }
});

const Info = ({ classes }) => {
  return (
    <>
      <main className={classes.main}>
        <Typography variant="h4" gutterBottom color="primary">
          About
        </Typography>
        <Typography
          paragraph
          gutterBottom
          variant="subtitle2"
          color="secondary"
        >
          Welcome to the Cornell University Northeast Regional Climate Center’s
          Lawn Irrigation App!
        </Typography>

        <Typography paragraph gutterBottom>
          The Lawn Irrigation App was developed with support from New York
          American Water to help customers water their lawns efficiently and
          effectively. It uses local climate data to let you know how much water
          your lawn needs based on your location and recent weather patterns. It
          is designed to help you:
        </Typography>

        <Typography paragraph gutterBottom>
          <li className={classes.li}>
            Give your lawn just the water it needs based on recent weather
            patterns specific to your location
          </li>
          <li className={classes.li}>
            Avoid overwatering your lawn – which can be a bigger cause of
            problems than under-watering
          </li>
          <li className={classes.li}>
            Contribute to a sustainable water supply for Long Island
          </li>
          <li className={classes.li}>Save you money on your water bill.</li>
        </Typography>

        <Typography paragraph gutterBottom>
          For more water saving tips, tools, and special offers for New York
          American Water customers please check out our H2O Control Toolbox{" "}
          <a
            href="https://amwater.com/nyaw/conservation"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.a}
          >
            H2O Control Toolbox
          </a>
          .
        </Typography>

        <Typography paragraph gutterBottom>
          You provide the app with your address and some basic information about
          your irrigation system and watering habits and we do the rest! The app
          considers the following factors:
        </Typography>

        <Typography paragraph gutterBottom>
          <li className={classes.li}>Evapotranspiration</li>
          <li className={classes.li}>Recent local rainfall</li>
          <li className={classes.li}>How much watering you’ve done recently</li>
          <li className={classes.li}>The local short-term weather forecast</li>
        </Typography>

        <Typography paragraph gutterBottom>
          The app then makes a data-driven recommendation on whether you should
          water your lawn in the coming few days. If you indicate that the
          Nassau County Irrigation ordinance applies to you the app will make
          recommendations consistent with the ordinance. The app uses the
          information you provide but neither NRCC nor New York American Water
          collects any data about you, or your lawn so you can rest assured that
          your privacy is protected.
        </Typography>

        <Typography paragraph gutterBottom>
          Please note that the app assumes you have a well-designed irrigation
          system that provides uniform coverage without any leaks in the system.
          It’s important to keep your system well-maintained. We recommend you
          check that your system is functioning correctly, at least annually and
          with the help of a professional irrigation contractor.
        </Typography>
      </main>

      <Nav />
    </>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Info)));
