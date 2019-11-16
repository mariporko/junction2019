import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryGroup, VictoryBar, VictoryAxis } from 'victory';

import { StyledCard } from "../StyledCard";

export function Sustainability() {
  const [electricityData, setElectricityData] = useState({current_week: 0, average: 0});
  const [heatData, setHeatData] = useState({current_week: 0, average: 0});
  const [waterData, setWaterData] = useState({current_week: 0, average: 0});

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
        setElectricityData(JSON.parse(body).data[0]);
      }
    });
    request(water_req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setWaterData(JSON.parse(body).data[0]);
      }
    });
    request(heat_req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setHeatData(JSON.parse(body).data);
      }
    });
  }, []);

  return (
    <StyledCard className="card-large sustainability">
      <h2>Energy consumption</h2>
      <p>When compared to the weekly average values.</p>
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
              style={{ data: { fill: ({ datum }) => datum.x < 2 ? "var(--blue)" : "var(--orange)" } }}
              data={[{ x: 1, y: electricityData.current_week }, { x: 2, y: electricityData.average }]}
            />
            <VictoryBar
              style={{ data: { fill: ({ datum }) => datum.x < 2 ? "var(--blue)" : "var(--orange)" } }}
              data={[{ x: 1, y: waterData.current_week }, { x: 2, y: waterData.average }]}
            />
            <VictoryBar
              style={{ data: { fill: ({ datum }) => datum.x < 2 ? "var(--blue)" : "var(--orange)" } }}
              data={[{ x: 1, y: heatData.current_week }, { x: 2, y: heatData.average }]}
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
