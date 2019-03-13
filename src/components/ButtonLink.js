import React from "react";
import MuiButton from "@material-ui/core/Button";
import { Link } from "@reach/router";

function ButtonLink(props) {
  return (
    <MuiButton
      component={Link}
      {...props}
      style={{
        paddingLeft: 24,
        paddingRight: 24,
        fontSize: "1.1rem",
        height: 80
      }}
    />
  );
}

export default ButtonLink;
