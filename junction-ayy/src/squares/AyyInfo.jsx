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
        <p className="margin-r-small">
          Join the house discussion in @ayy-smt-6!
        </p>
        <img
          className="qr-koodi"
          alt="QR-code"
          src={code}
          style={{ height: "120px" }}
        />
      </div>
    </Fragment>
  );
}
