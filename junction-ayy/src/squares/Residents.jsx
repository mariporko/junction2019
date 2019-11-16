import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";

import { RESIDENTS } from "../building_information";

export function Residents() {
  return (
    <Card className="card residents">
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
    </Card>
  );
}
