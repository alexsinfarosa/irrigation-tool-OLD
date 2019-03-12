import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";

// components
import ButtonLink from "../components/ButtonLink";

// common styles
import { pageWrapper, main } from "../styles/common";

const styles = theme => ({
  pageWrapper: { ...pageWrapper },
  main: { ...main }
});

const IrrigationDate = ({ classes }) => {
  return (
    <div className={classes.pageWrapper}>
      <main className={classes.main}>
        <h2>IrrigationDate</h2>
        <ButtonLink
          to="/sprinkler"
          variant="outlined"
          color="primary"
          size="large"
        >
          Continue
        </ButtonLink>
      </main>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(IrrigationDate)));
