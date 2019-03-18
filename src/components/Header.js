import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 60,
    marginTop: -16
  },
  span: {
    flexGrow: 1,
    textAlign: "center"
  }
});

const Header = ({ classes, icon, title, right, theme }) => {
  return (
    <div className={classes.root}>
      <span className={classes.span}>
        <FontAwesomeIcon
          icon={icon}
          size="lg"
          color={theme.palette.grey["800"]}
          onClick={() => window.history.back()}
        />
      </span>
      <span className={classes.span}>
        <Typography variant="h6" style={{ color: theme.palette.grey["800"] }}>
          {title}
        </Typography>
      </span>
      <span className={classes.span}>{right}</span>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Header)));
