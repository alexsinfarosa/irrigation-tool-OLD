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
        <NRCCLogo />
      </div>
      <div style={{ width: 130 }}>
        <WaterLogo />
      </div>
    </div>
  );
};

export default Logos;
