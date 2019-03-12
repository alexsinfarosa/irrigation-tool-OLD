import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";

// components
import Nav from "../components/Nav";

// common styles
import { pageWrapper, main } from "../styles/common";

const styles = theme => ({
  pageWrapper: { ...pageWrapper },
  main: { ...main }
});

const LawnList = ({ classes }) => {
  return (
    <div className={classes.pageWrapper}>
      <main className={classes.main}>
        <h2>List of Lawns</h2>
      </main>

      <Nav />
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(LawnList)));
