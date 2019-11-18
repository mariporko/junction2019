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
      <div className="card-header">
        <h3>Energy consumption</h3>
      </div>
      <div className="card-content" style={{ textAlign: "center" }}>
        <img
          className="chart-img"
          alt="chart image"
          src={chart}
          style={{ maxWidth: "100%", maxHeight: "490px", bottom: "0px" }}
        />
      </div>

      <div className="card-footer"></div>
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
      <div className="card-header">
        <h4>Energy consumption (last week):</h4>
      </div>
      <div className="card-content">
        <p>Electricity consumption: {electricityData.current_week} kWh</p>
        <p>
          Water consumption: {waterData.current_week} m<sup>3</sup>
        </p>
      </div>
      <div className="card-footer">
        <img
          className="circle-img margin-r-small"
          alt="energy circle image"
          src={energy}
          style={{ width: "100px" }}
        />
      </div>
    </StyledCard>
  );
}
