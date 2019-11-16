import React, { useEffect, useState, Fragment } from 'react';

import { StyledCard } from '../StyledCard';

export function Sustainability() {
  const [electricityData, setElectricityData] = useState();
  const [heatData, setHeatData] = useState();
  const [waterData, setWaterData] = useState();

  const electricity = "http://localhost:5000/el";
  const heat = "http://localhost:5000/heat";
  const water = "http://localhost:5000/water";

  useEffect(() => {
    const request = require("request");

    let el_req = {
      url: electricity,
      method: "GET",
    };

    let heat_req = {
      url: heat,
      method: "GET",
    };

    let water_req = {
      url: water,
      method: "GET",
    };

    request(el_req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setElectricityData(JSON.parse(body).data);
      }
    });
    request(water_req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setWaterData(JSON.parse(body).data);
      }
    });
    request(heat_req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setHeatData(JSON.parse(body).data);
      }
    });
  }, []);

  return (
      <StyledCard className="card sustainability">
        <h2>Energy consumption</h2>
        <p>Electricity: {electricityData}</p>
        <p>Water: {waterData}</p>
        <p>Heat: {heatData}</p>
      </StyledCard>
  );
}

export function SustainabilitySummary() {
  const electricityData = 5000;
  const waterData = 4000;
  
  return (
      <StyledCard className="card sustainability">
        <h3>In the last month...</h3>
        <p>We have used {electricityData} kWh of electricity.</p>
        <p>We have used {waterData} L of water.</p>
      </StyledCard>
  );
}