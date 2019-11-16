import React, { Fragment } from "react";
import code from "../assets/qr-some.svg";

export function AyyInfo() {
  return (
    <Fragment>
      <div className="footer-left"></div>
      <div className="footer-middle">
        <h2>AYYHELLO</h2>
      </div>
      <div className="footer-right">
        <p>Join the house discussion in @ayy-smt-6!</p>
        <img className="qr-koodi" alt="QR-code" src={code} />
      </div>
    </Fragment>
  );
}
