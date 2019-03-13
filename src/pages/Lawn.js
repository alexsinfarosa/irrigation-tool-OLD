import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

// common styles
import { main } from "../styles/common";

const styles = theme => ({
  main: { ...main }
});

const Lawn = ({ classes }) => {
  return (
    <div className={classes.main}>
      <Typography variant="h4" gutterBottom>
        Lawn
      </Typography>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Lawn)));
