import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";

// common styles
import { main } from "../styles/common";

const styles = theme => ({
  main: { ...main }
});

const Lawn = ({ classes }) => {
  return (
    <div className={classes.main}>
      <h2>Lawn</h2>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Lawn)));
