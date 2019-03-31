import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import Typography from "@material-ui/core/Typography";

const styles = theme => ({});

const TopMessage = ({ lawn, theme }) => {
  // const today = new Date().toLocaleDateString();
  // const irrigationDate = lawn.data.find(day => day.date === today);

  let streetNumber = "odd";
  if (lawn.streetNumber !== null && lawn.streetNumber % 2 === 0)
    streetNumber = "even";

  let todayDate = "odd";
  if (new Date().getDate() % 2 === 0) todayDate = "even";

  const allowedToWater = streetNumber === todayDate;

  const todayPlusTwoDeficit = lawn.data[lawn.data.length - 1].barDeficit;
  const todayDeficit = lawn.data[lawn.data.length - 3].barDeficit;
  const isDeficit = todayPlusTwoDeficit + todayDeficit < 0;

  return (
    <div>
      <Typography variant="body2" align="center" color="error">
        (ßeta release)
      </Typography>
      {!lawn.isStreetNumberRequired || allowedToWater ? (
        <Typography
          variant="h6"
          align="center"
          style={{
            background: isDeficit ? "#F79824" : "#0197F6",
            color: "#fff",
            padding: 8,
            marginBottom: 16
          }}
        >
          {isDeficit ? "Water!" : "Do not Water!"}
        </Typography>
      ) : (
        <Typography
          variant="h6"
          align="center"
          style={{
            background: theme.palette.grey["500"],
            color: "#fff",
            padding: 8,
            marginBottom: 16
          }}
        >
          Not Allowed - <small>({todayDate} day)</small>
        </Typography>
      )}
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(TopMessage)));
