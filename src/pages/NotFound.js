import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
});

const NotFound = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography variant="h6" color="primary">
        Sorry, page not found
      </Typography>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(NotFound)));
