import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

// components
import ButtonLink from "../components/ButtonLink";
import Header from "../components/Header";

// utils
import { InlineDatePicker } from "material-ui-pickers";
import format from "date-fns/format";

// common styles
import { locationRoot, main } from "../styles/common";

const styles = theme => ({
  root: { ...locationRoot },
  main: { ...main }
});

const IrrigationDate = ({ classes }) => {
  // State ---------------------------------------------------
  const [irrigationDate, setIrrigationDate] = React.useState(new Date());

  return (
    <div className={classes.root}>
      <Header icon="chevron-left" title="Irrigation Date - (step 2/3)" />
      <main className={classes.main}>
        <Typography variant="h6" align="center" gutterBottom>
          When did you last irrigate your lawn?
        </Typography>

        <br />
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <InlineDatePicker
            onlyCalendar
            variant="outlined"
            disableFuture
            keyboard="off"
            // minDate={`03/01/${new Date().getFullYear()}`}
            minDateMessage="Data is only available after March 1st."
            format={format(new Date(irrigationDate), "MM/dd/yyyy")}
            label="Irrigation Date"
            value={irrigationDate}
            onChange={setIrrigationDate}
            style={{ width: 250 }}
          />
        </div>
      </main>
      <ButtonLink to="/sprinkler" variant="contained" fullWidth color="primary">
        Continue
      </ButtonLink>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(IrrigationDate)));
