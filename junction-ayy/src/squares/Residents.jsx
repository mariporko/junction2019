import React, { Fragment } from "react";

import { RESIDENTS } from "../building_information";
import { StyledCard } from "../StyledCard";

export function Residents() {
  return (
    <StyledCard className="card residents">
      <h2>LIST OF TENANTS</h2>
      {RESIDENTS.map((floor, key) => {
        return (
          <Fragment>
            <span className="tenant-h2">FLOOR {floor.floor}</span>
            <ul className="floor">
              {floor.tenants.map((apartment, key1) => {
                return (
                  <li className="apartment" key={key1}>
                    {apartment.number} -{" "}
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
      ); })}
    </StyledCard>
  );
}
