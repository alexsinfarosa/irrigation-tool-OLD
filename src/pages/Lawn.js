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

// common styles
import { main } from "../styles/common";
import AppContext from "../context/appContext";

const styles = theme => ({
  main: { ...main }
});

const Lawn = ({ classes }) => {
  const { lawn } = React.useContext(AppContext);
  const [isDialog, setIsDialog] = React.useState(false);

  return (
    <>
      <main className={classes.main}>
        <pre>{JSON.stringify(lawn, null, 2)}</pre>

        <Dialog
          open={isDialog}
          onClose={() => setIsDialog(false)}
          aria-labelledby="alert-dialog-information-about-app"
          aria-describedby="alert-dialog-how-to-use-app"
          hideBackdrop={true}
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="body1" gutterBottom>
              First
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea
              corporis delectus laborum eaque odit ex perferendis! Pariatur
              totam harum numquam nostrum eos, delectus quo enim velit at nemo,
              blanditiis expedita?
            </Typography>

            <br />
            <Typography variant="body1" gutterBottom>
              Second
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              molestias quo nisi. Corrupti dolore, explicabo sapiente adipisci
              quibusdam pariatur voluptate eum cumque, reprehenderit laboriosam
              inventore exercitationem iusto aliquid accusantium illo.
            </Typography>

            <br />
            <Typography variant="body1" gutterBottom>
              Third
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              dolore esse minima obcaecati, consectetur, earum ea qui deserunt
              omnis dolorum ipsam blanditiis voluptas voluptatem quam quas neque
              officia, temporibus aspernatur.
            </Typography>
          </DialogTitle>

          <DialogActions>
            <Button color="secondary" onClick={() => setIsDialog(false)}>
              OK!
            </Button>
          </DialogActions>
        </Dialog>
      </main>

      <Nav />
    </>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Lawn)));
