import React from "react";
import { ReactComponent as NRCCLogo } from "../images/nrcc-logo.svg";
import { ReactComponent as WaterLogo } from "../images/AW-NEW YORK_PMS.svg";

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
        <a
          href="http://www.nrcc.cornell.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NRCCLogo />
        </a>
      </div>
      <div style={{ width: 130 }}>
        <a
          href="https://amwater.com/nyaw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WaterLogo />
        </a>
      </div>
    </div>
  );
};

export default Logos;
