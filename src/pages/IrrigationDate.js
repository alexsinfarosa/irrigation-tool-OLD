import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

// components
import ButtonLink from "../components/ButtonLink";
import Header from "../components/Header";

// utils
import { DatePicker } from "material-ui-pickers";
import format from "date-fns/format";

// common styles
import { main, footer, buttonBig } from "../styles/common";
import AppContext from "../context/appContext";

const styles = theme => ({
  main: { ...main },
  footer: { ...footer }
});

const IrrigationDate = ({ classes }) => {
  console.log("IrrigationDate");
  // CONTEXT ---------------------------------------------------
  const { updateLawn } = React.useContext(AppContext);

  // State ---------------------------------------------------
  const thisYear = new Date().getFullYear();
  const [irrigationDate, setIrrigationDate] = React.useState({
    irrigationDate: new Date().toLocaleDateString(),
    isThisYear: true
  });

  const handleIrrigationDate = date => {
    setIrrigationDate({
      irrigationDate: date.toLocaleDateString(),
      isThisYear: date.getFullYear() === thisYear
    });
  };

  return (
    <>
      <main className={classes.main}>
        <Header icon="chevron-left" title="Irrigation Date - (step 2/3)" />
        <Typography variant="h6" align="center" gutterBottom>
          When did you last irrigate your lawn?
        </Typography>

        <br />
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <DatePicker
            variant="outlined"
            disableFuture
            // shouldDisableDate={day => console.log(day)}
            keyboard
            showTodayButton
            minDate={`03/01/${new Date().getFullYear()}`}
            minDateMessage="Data is only available after March 1st."
            format={format(
              new Date(irrigationDate.irrigationDate),
              "MM/dd/yyyy"
            )}
            label="Irrigation Date"
            value={irrigationDate.irrigationDate}
            onChange={handleIrrigationDate}
            style={{ width: 250 }}
          />
        </div>
      </main>

      <div className={classes.footer}>
        <ButtonLink
          to="/sprinkler"
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => updateLawn(irrigationDate)}
          style={{ ...buttonBig }}
        >
          Continue
        </ButtonLink>
      </div>
    </>
  );
};

export default withRoot(withStyles(styles)(withTheme()(IrrigationDate)));
