import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

// components
import Nav from "../components/Nav";
import Logos from "../components/Logos";

// common styles
import { pageWrapper, main } from "../styles/common";

// utils
import format from "date-fns/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContext from "../context/appContext";
import { navigate } from "@reach/router";

const styles = theme => ({
  pageWrapper: { ...pageWrapper },
  main: { ...main },
  paper: {
    marginBottom: "24px"
  }
});

const LawnList = ({ classes }) => {
  const { lawns, lawn, setLawn, setLawns, setNavPath } = React.useContext(
    AppContext
  );

  // STATE ----------------------------------------------
  const [isDialog, setIsDialog] = React.useState(false);
  const [lawnId, setLawnId] = React.useState(0);

  const deleteLawn = () => {
    const updatedLawns = lawns.filter(lawn => lawn.id !== lawnId);
    setLawns(updatedLawns);
  };
  return (
    <div className={classes.pageWrapper}>
      <main className={classes.main}>
        <Logos />
        <div style={{ marginBottom: 32 }} />
        {lawns.map(l => {
          const isSelected = l.id === lawn.id;
          return (
            <Paper
              key={l.id}
              className={classes.paper}
              elevation={isSelected ? 4 : 1}
            >
              <List component="nav">
                <ListItem
                  onClick={() => {
                    setLawn(l);
                    navigate("/main");
                    setNavPath("main");
                  }}
                >
                  {true ? (
                    <FontAwesomeIcon icon="tint" color={"#F79824"} size="2x" />
                  ) : (
                    <FontAwesomeIcon icon="tint" color={"#0197F6"} size="2x" />
                  )}

                  <ListItemText
                    primary={l.address}
                    secondary={format(
                      new Date(l.irrigationDate),
                      "MMMM dd, yyyy"
                    )}
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="ellipsis"
                      onClick={() => {
                        setLawnId(l.id);
                        setIsDialog(true);
                      }}
                      style={{ marginRight: 8 }}
                    >
                      <FontAwesomeIcon icon={["fal", "ellipsis-h"]} size="lg" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          );
        })}
      </main>

      {/* DIALOG -----------------------------*/}
      <Dialog
        open={isDialog}
        onClose={() => setIsDialog(false)}
        aria-labelledby="alert-dialog-delete-lawn"
        aria-describedby="alert-dialog-delete-selected-lawn"
        // hideBackdrop={true}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="body2">
            Are you sure you want to delete it?
          </Typography>
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setIsDialog(false)} color="secondary">
            Undo
          </Button>
          <Button
            onClick={() => {
              deleteLawn();
              setIsDialog(false);
            }}
            color="secondary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Nav />
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(LawnList)));
