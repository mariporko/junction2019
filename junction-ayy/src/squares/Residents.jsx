import React, { Fragment } from "react";

import { RESIDENTS } from "../building_information";
import { StyledCard } from "../StyledCard";

import bg_image from "../assets/lettered-bg.svg";

import "./Recidents.css";

var bgImage = {
  backgroundImage: `url(${bg_image})`
};

export function Residents() {
  return (
    <StyledCard className="card residents" style={bgImage}>
      <h2 className="tenant-h1">LIST OF TENANTS</h2>
      {RESIDENTS.map((floor, key) => {
        return (
          <Fragment>
            <span className="tenant-h2">FLOOR {floor.floor}</span>
            <ul className="floor">
              {floor.tenants.map((apartment, key1) => {
                return (
                  <li className="apartment tenant-body" key={key1}>
                    {"A "} {apartment.number} {" - "}
                    {apartment.names.map((name, key2) => {
                      const multiple = key2 > 0;
                      return (
                        <span className="name" key={key2}>
                          {multiple && ","} {name}
                        </span>
                      );
                    })}
                  </li>
                );
              })}
            </ul>
          </Fragment>
        );
      })}
    </StyledCard>
  );
}
