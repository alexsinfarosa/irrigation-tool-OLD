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

const Main = ({ classes, children }) => {
  return (
    <div className={classes.pageWrapper}>
      {children}
      <Nav />
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Main)));
