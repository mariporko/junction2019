import React, { Fragment } from "react";
import code from "../assets/qr-some.svg";
import logo from "../assets/ayyhello-logo.svg";

export function AyyInfo() {
  return (
    <Fragment>
      <div className="footer-left">
        <img
          className="logo"
          alt="ayyhello logo"
          src={logo}
          style={{ height: "72px" }}
        />
      </div>
      {/* <div className="footer-middle">
        <h2>AYYHELLO</h2>
      </div> */}
      <div className="footer-right flex">
        <p
          className="margin-r-medium"
          style={{ textAlign: "right", lineHeight: "1.5em" }}
        >
          Join the house discussion<br></br>in{" "}
          <span style={{ fontWeight: "bold", color: "#EEBC32" }}>
            @ayy-smt-6
          </span>
          !
        </p>
        <img
          className="qr-koodi"
          alt="QR-code"
          src={code}
          style={{ height: "108px" }}
        />
      </div>
    </Fragment>
  );
}
