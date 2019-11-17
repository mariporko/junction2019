import React, { useEffect, useState } from "react";

import { StyledCard } from "../StyledCard";

import energy from "../assets/energy-circle.svg";
import chart from "../assets/chart.svg";

export function Sustainability() {
  const [electricityData, setElectricityData] = useState({
    current_week: 0,
    average: 0
  });
  const [waterData, setWaterData] = useState({ current_week: 0, average: 0 });

  useEffect(() => {
    const request = require("request");

    let el_req = { url: "http://localhost:5000/el", method: "GET" };
    let water_req = { url: "http://localhost:5000/water", method: "GET" };

    request(el_req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setElectricityData(JSON.parse(body));
      }
    });

    request(water_req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setWaterData(JSON.parse(body));
      }
    });
  }, []);

  return (
    <StyledCard className="card-large sustainability">
      <h3>Energy consumption</h3>
      <p style={{ margin: "12px" }}>
        When compared to the weekly average values.
      </p>
      <div className="flex justify">
        <img
          className="chart-img"
          alt="chart image"
          src={chart}
          style={{ width: "620px", margin: "24px auto auto 24px" }}
        />
      </div>
    </StyledCard>
  );
}

export function SustainabilitySummary() {
  const [electricityData, setElectricityData] = useState({
    current_week: 0,
    average: 0
  });
  const [waterData, setWaterData] = useState({ current_week: 0, average: 0 });

  useEffect(() => {
    const request = require("request");

    let el_req = { url: "http://localhost:5000/el", method: "GET" };
    let water_req = { url: "http://localhost:5000/water", method: "GET" };

    request(el_req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setElectricityData(JSON.parse(body));
      }
    });

    request(water_req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setWaterData(JSON.parse(body));
      }
    });
  }, []);

  return (
    <StyledCard className="card-small sustainability">
      <div
        className="flex justify"
        style={{ flexDirection: "column", textAlign: "center" }}
      >
        <h4 style={{ marginBottom: "12px" }}>
          Energy consumption (last week):
        </h4>
        <div className="content">
          <p style={{ marginBottom: "6px" }}>
            Electricity consumption: {electricityData.current_week} kWh
          </p>
          <p>Water consumption: {waterData.current_week} m^3</p>
        </div>
        <img
          className="circle-img margin-r-small"
          alt="energy circle image"
          src={energy}
          style={{ width: "100px", marginTop: "24px" }}
        />
      </div>
    </StyledCard>
  );
}
