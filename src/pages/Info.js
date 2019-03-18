import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

// common styles
import { pageWrapper, main } from "../styles/common";

const styles = theme => ({
  pageWrapper: { ...pageWrapper },
  main: { ...main }
});

const Info = ({ classes }) => {
  return (
    <div className={classes.pageWrapper}>
      <main className={classes.main}>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          dolor dolorum optio, nam quae voluptate placeat ducimus provident
          necessitatibus, quod error fugiat cupiditate nulla inventore
          voluptatem adipisci iure corrupti voluptates.
        </Typography>

        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga rem nisi
          non, asperiores sequi animi aut voluptatum fugit qui ea repellendus ab
          impedit, corrupti quo? Asperiores facilis molestias fuga ab!
        </Typography>

        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga rem nisi
          non, asperiores sequi animi aut voluptatum fugit qui ea repellendus ab
          impedit, corrupti quo? Asperiores facilis molestias fuga ab!
        </Typography>

        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga rem nisi
          non, asperiores sequi animi aut voluptatum fugit qui ea repellendus ab
          impedit, corrupti quo? Asperiores facilis molestias fuga ab!
        </Typography>

        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga rem nisi
          non, asperiores sequi animi aut voluptatum fugit qui ea repellendus ab
          impedit, corrupti quo? Asperiores facilis molestias fuga ab!
        </Typography>

        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga rem nisi
          non, asperiores sequi animi aut voluptatum fugit qui ea repellendus ab
          impedit, corrupti quo? Asperiores facilis molestias fuga ab!
        </Typography>

        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga rem nisi
          non, asperiores sequi animi aut voluptatum fugit qui ea repellendus ab
          impedit, corrupti quo? Asperiores facilis molestias fuga ab!
        </Typography>

        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga rem nisi
          non, asperiores sequi animi aut voluptatum fugit qui ea repellendus ab
          impedit, corrupti quo? Asperiores facilis molestias fuga ab!
        </Typography>

        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga rem nisi
          non, asperiores sequi animi aut voluptatum fugit qui ea repellendus ab
          impedit, corrupti quo? Asperiores facilis molestias fuga ab!
        </Typography>
      </main>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Info)));
