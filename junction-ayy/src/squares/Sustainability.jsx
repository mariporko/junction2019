import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryGroup, VictoryBar, VictoryAxis } from 'victory';

import { StyledCard } from "../StyledCard";

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
      method: "GET"
    };

    let heat_req = {
      url: heat,
      method: "GET"
    };

    let water_req = {
      url: water,
      method: "GET"
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

  const averageElectricity = 4000;
  const averageWater = 6000;
  const averageHeat = 5000;

  const el = [{ x: 1, y: {electricityData} }, { x: 2, y: {averageElectricity} }];
  const wa = [{ x: 1, y: {waterData} }, { x: 2, y: {averageWater} }];
  const he = [{ x: 1, y: {heatData} }, { x: 2, y: {averageHeat} }];

  return (
    <StyledCard className="card-large sustainability">
      <h2>Energy consumption</h2>
        <VictoryChart height={200}>
          <VictoryGroup 
            offset={20}
            colorScale={"qualitative"}
          >
            <VictoryAxis
              tickValues={[1, 2, 3]}
              tickFormat={["Electricity", "Water", "Heat"]}
            />
            <VictoryBar
              data={el}
            />
            <VictoryBar
              data={wa}
            />
            <VictoryBar
              data={he}
            />
          </VictoryGroup>
        </VictoryChart>
    </StyledCard>
  );
}

export function SustainabilitySummary() {
  const electricityData = 5000;
  const waterData = 4000;

  return (
    <StyledCard className="card-small sustainability">
      <h4>In the last month...</h4>
      <p>We have used {electricityData} kWh of electricity.</p>
      <p>We have used {waterData} L of water.</p>
    </StyledCard>
  );
}
