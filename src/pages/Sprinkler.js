import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";

// components
import ButtonLink from "../components/ButtonLink";
import Header from "../components/Header";

// common styles
import { pageWrapper, main } from "../styles/common";

const styles = theme => ({
  pageWrapper: { ...pageWrapper },
  main: { ...main }
});

const Sprinkler = ({ classes }) => {
  return (
    <div className={classes.pageWrapper}>
      <Header icon="chevron-left" title="Sprinkler Type - (step 3/3)" />
      <main className={classes.main}>
        <h2>Sprinkler</h2>
        <ButtonLink to="/main" variant="outlined" color="primary" size="large">
          Continue
        </ButtonLink>
      </main>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Sprinkler)));
