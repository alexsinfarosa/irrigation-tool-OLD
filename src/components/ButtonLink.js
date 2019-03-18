import React from "react";
import MuiButton from "@material-ui/core/Button";
import { Link } from "@reach/router";

function ButtonLink(props) {
  return <MuiButton component={Link} {...props} />;
}

export default ButtonLink;
