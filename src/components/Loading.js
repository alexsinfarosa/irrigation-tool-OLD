import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";

// lib
import RingLoader from "react-spinners/RingLoader";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
});

const Loading = ({ classes, theme }) => {
  return (
    <div className={classes.root}>
      <RingLoader color={theme.palette.primary.main} />
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Loading)));
