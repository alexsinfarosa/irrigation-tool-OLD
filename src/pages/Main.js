import React from "react";
import withRoot from "../withRoot";

// components
import Nav from "../components/Nav";

const Main = ({ children }) => {
  return (
    <div>
      {children}
      <Nav />
    </div>
  );
};

export default withRoot(Main);
