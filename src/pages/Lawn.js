import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

// common styles
import { main } from "../styles/common";
import AppContext from "../context/appContext";

const styles = theme => ({
  main: { ...main }
});

const Lawn = ({ classes }) => {
  const { lawn } = React.useContext(AppContext);
  return (
    <div className={classes.main}>
      <Typography variant="h5" gutterBottom>
        <pre>{JSON.stringify(lawn, null, 4)}</pre>
      </Typography>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Lawn)));
