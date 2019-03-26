import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

// components
import Nav from "../components/Nav";
import BarChartDeficit from "../components/barChart";
import TopMessage from "../components/topMessage";

// common styles
import { main } from "../styles/common";
import AppContext from "../context/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = theme => ({
  main: { ...main },
  blue: {
    color: "#fff",
    background: "#3F96ED",
    padding: `1px 3px`,
    borderRadius: 2,
    letterSpacing: 1
  },
  orange: {
    color: "#fff",
    background: "#EA9B42",
    padding: "1px 3px",
    borderRadius: 2,
    letterSpacing: 1
  }
});

const Lawn = ({ classes, theme }) => {
  const { lawns, lawn, visits, setVisits } = React.useContext(AppContext);
  const [isDialog, setIsDialog] = React.useState(false);

  React.useEffect(() => {
    if (visits <= 1 && lawns.length === 1) {
      setIsDialog(true);
    }
  }, []);

  // console.log(lawn);
  return (
    <>
      <main className={classes.main} style={{ padding: 0 }}>
        <TopMessage lawn={lawn} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Typography variant="subtitle2" align="center" color="textSecondary">
            {lawn.address}
          </Typography>

          <FontAwesomeIcon
            icon={["fal", "question-circle"]}
            onClick={() => setIsDialog(true)}
            size="lg"
            color={theme.palette.grey["500"]}
          />
        </div>

        <BarChartDeficit />

        <Dialog
          open={isDialog}
          onClose={() => setIsDialog(false)}
          aria-labelledby="alert-dialog-information-about-app"
          aria-describedby="alert-dialog-how-to-use-app"
          hideBackdrop={true}
        >
          <DialogTitle id="alert-dialog-title">
            <Typography
              variant="body1"
              gutterBottom
              style={{ color: theme.palette.primary.dark }}
            >
              Top Bar
            </Typography>
            <Typography variant="body2" gutterBottom>
              At the top of the application there is a colored bar, which
              displays the recommendation messages. The messages within this bar
              should be used to determine whether or not to water the lawn.
            </Typography>

            <br />
            <Typography
              variant="body1"
              gutterBottom
              style={{ color: theme.palette.primary.dark }}
            >
              Address
            </Typography>
            <Typography variant="body2" gutterBottom>
              This is the address provided by the user. It is required to obtain
              weather related data. On the right side of the address there is a
              question mark icon. Tapping this icon will trigger the current
              pop-up on/off.
            </Typography>

            <br />
            <Typography
              variant="body1"
              gutterBottom
              style={{ color: theme.palette.primary.dark }}
            >
              Graph
            </Typography>
            <Typography variant="body2" gutterBottom>
              The left part of the graph shows the dates. The first two dates
              from the top are forecast dates, the colored date, which can be
              orange or blue, depending on the deficit status, is the current
              date. Going down we have dates in the past which go back a full
              week.
            </Typography>

            <br />
            <Typography variant="body2" gutterBottom>
              The center part of the graph contains the colored bars. A single
              bar represents the water deficit of a given day, it can be orange
              or blue. An orange bar is displayed when there is water deficit,
              hence the lawn is dry. A blue bar is displayed when there is no
              deficit, the lawn is wet. The length of the bar gives the user a
              guidance on the relative amount of dryiness or wettness the lawn
              is.
            </Typography>

            <br />
            <Typography variant="body2" gutterBottom>
              The right part of the graph containing the icons is the area where
              the user interacts with the app. The first two forecast icons from
              the top are not clickable and are there to inform the user of the
              probability of precipitation. The drop shaped icons can be tapped
              by the user. Tapping the icon, will changes its color. Blue color
              indicates that the lawn has been watered. Untapping the icon,
              which makes it gray indicates that no water was applied on the
              lawn.
            </Typography>

            <br />
            <Typography
              variant="body1"
              gutterBottom
              style={{ color: theme.palette.primary.dark }}
            >
              Example
            </Typography>

            <Typography variant="body2" gutterBottom>
              When water deficit reaches a certain level, the top colored bar
              (in this case orange) will inform the user to water their lawn.
              The user at this point should follow the app’s recommendation by
              watering their lawn and by tapping the drop icon relative to the
              current date. In doing so, the user informs the app that the
              recommendation has been followed and consequently the newly added
              water will be used to recalculate the deficit.
            </Typography>

            <br />
            <Typography variant="body2" gutterBottom>
              Tapping on any of the drop icons simply adds or removes water. The
              amount of water is calculated by the rate of the sprinkler head
              and the amount of time, in minutes that it runs.
            </Typography>
          </DialogTitle>
          <DialogActions>
            <Button
              color="secondary"
              onClick={() => {
                setIsDialog(false);
                setVisits(visits + 1);
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </main>

      <Nav />
    </>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Lawn)));
