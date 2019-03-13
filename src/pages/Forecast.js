import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

// components
import Nav from "../components/Nav";

// common styles
import { pageWrapper, main } from "../styles/common";

const styles = theme => ({
  pageWrapper: { ...pageWrapper },
  main: { ...main }
});

const Forecast = ({ classes }) => {
  return (
    <div className={classes.pageWrapper}>
      <main className={classes.main}>
        <Typography variant="h4" gutterBottom>
          Forecast
        </Typography>
      </main>

      <Nav />
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Forecast)));
