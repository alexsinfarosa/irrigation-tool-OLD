import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

// components
import Nav from "../components/Nav";

// common styles
import { pageWrapper, main } from "../styles/common";

// utils
import { mapIcon } from "../utils/mapIcon";
import format from "date-fns/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContext from "../context/appContext";

const styles = theme => ({
  pageWrapper: { ...pageWrapper },
  main: { ...main },
  forecastRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8
  },
  forecastList: {
    marginBottom: 32
  }
});

const Forecast = ({ classes, theme }) => {
  const { lawn } = React.useContext(AppContext);
  const { daily, currently } = lawn.forecast;
  return (
    <div className={classes.pageWrapper}>
      <main className={classes.main}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 16
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignitems: "baseline",
                height: 60
              }}
            >
              <FontAwesomeIcon
                icon={mapIcon(currently.icon)}
                color={theme.palette.grey["700"]}
                size="xs"
                style={{
                  width: 60,
                  height: 60,
                  marginRight: 8
                }}
              />
            </div>
            <Typography variant="h3">
              {Math.round(currently.temperature, 2)}˚
            </Typography>
          </div>
          <Typography variant="body2">{currently.summary}</Typography>
        </div>

        <div
          style={{
            margin: "0 -32px 32px -32px"
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            color="primary"
            style={{
              fontWeight: "bold",
              color: "#fff",
              background: theme.palette.primary.main,
              padding: "0 32px"
            }}
          >
            Next 7 Days
          </Typography>
          <Typography
            variant="caption"
            style={{
              display: "block",
              padding: "0 32px"
            }}
          >
            {daily.summary}
          </Typography>
        </div>

        <div className={classes.forecastList}>
          {daily.data.map(day => {
            // console.log(day.icon);
            return (
              <div key={day.time} className={classes.forecastRow}>
                <div>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{ width: 50, fontWeight: "bold" }}
                  >
                    {format(new Date(day.time) * 1000, "EEE").toUpperCase()}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <FontAwesomeIcon
                      icon="raindrops"
                      style={{ marginRight: 4 }}
                      color={"#0197F6"}
                    />
                    <Typography variant="caption" align="left">
                      {`${Math.round(day.precipProbability * 100)}%`}
                    </Typography>
                  </div>
                </div>

                <FontAwesomeIcon
                  icon={mapIcon(day.icon)}
                  // style={{ marginRight: 4 }}
                  color={theme.palette.text.secondary}
                  size="lg"
                />

                <Typography variant="body1">{`${Math.round(
                  day.temperatureLow,
                  1
                )}˚`}</Typography>
                <Typography variant="body1">
                  {`${Math.round(day.temperatureHigh, 1)}˚`}
                </Typography>
              </div>
            );
          })}
        </div>
      </main>

      <Nav />
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Forecast)));
