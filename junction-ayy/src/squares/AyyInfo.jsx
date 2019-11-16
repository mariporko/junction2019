import React, { Fragment } from "react";
import code from "../assets/qr-some.svg";

export function AyyInfo() {
  return (
    <Fragment>
      <div className="footer-left">kjhdf</div>
      <div className="footer-middle">
        <h2>AYYHELLO</h2>
      </div>
      <div className="footer-right flex">
        <p className="margin-r">Join the house discussion in @ayy-smt-6!</p>
        <img
          className="qr-koodi"
          alt="QR-code"
          src={code}
          style={{ height: "140px" }}
        />
      </div>
    </Fragment>
  );
}
