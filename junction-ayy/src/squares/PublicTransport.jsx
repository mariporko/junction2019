import React, { useState, useEffect } from "react";
import bus from "../assets/bus.svg";
import arrow from "../assets/arrow.svg";
import { StyledCard } from "../StyledCard";

export function PublicTransport() {
  const [data, setData] = useState([
    {
      headsign: "",
      trip: { route: { shortName: "" } },
      realtimeDeparture: 0,
      serviceDay: 0
    }
  ]);

  useEffect(() => {
    const request = require("request");

    let req = {
      url: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
      method: "POST",
      headers: { "Content-Type": "application/graphql" },
      body: `{
                stop(id: "HSL:2222210") {
                name
                stoptimesWithoutPatterns {
                    realtimeDeparture
                    trip {
                        route {
                            shortName
                        }
                    }
                    headsign
                }
                }
            }`
    };

    request(req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setData(JSON.parse(body).data.stop.stoptimesWithoutPatterns);
      }
    });
  }, []);

  function nextWillDepart(departs) {
    if (data) {
      let now = Math.floor(
        (new Date() - new Date().setHours(0, 0, 0, 0)) / 1000
      );
      let timeLeft = Math.floor((departs - now) / 100);
      return timeLeft;
    } else {
      return "";
    }
  }

  return (
    <StyledCard className="card travel">
      <h4>Public transportation</h4>
      <ul className="hsl-feed">
        {data.map((departure, key) => {
          return (
            <li className="departure" key={key}>
              <img className="bus-icon" alt="BUS" src={bus} />
              <span className="bus-line">{departure.trip.route.shortName}</span>
              <img className="arrow-icon" alt="->" src={arrow} />
              <span className="bus-to">{departure.headsign}</span>
              <span className="departure-time">
                {nextWillDepart(departure.realtimeDeparture)}
              </span>
            </li>
          );
        })}
      </ul>
    </StyledCard>
  );
}
