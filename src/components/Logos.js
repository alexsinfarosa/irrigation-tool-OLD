import React from "react";
import { ReactComponent as NRCCLogo } from "../images/nrcc-logo.svg";

import water from "../images/ny-american-water-logo.png";

const Logos = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div>
        <NRCCLogo />
      </div>
      <div>
        <img
          src={water}
          alt="NY American Water Logo"
          style={{
            display: "block",
            width: 130,
            height: "auto"
          }}
        />
      </div>
    </div>
  );
};

export default Logos;
