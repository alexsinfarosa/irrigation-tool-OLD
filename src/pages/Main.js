import React from "react";
import withRoot from "../withRoot";

// components
import Nav from "../components/Nav";

const Main = ({ children }) => {
  return (
    <>
      {children}
      <Nav />
    </>
  );
};

export default withRoot(Main);
