import React, { useState, useEffect } from "react";
import { StyledCard } from "../StyledCard";

export function Game() {
  const [direction, setDirection] = useState("");

  useEffect(() => {
    const request = require("request");
    let req = { url: "http://localhost:5000/dir", method: "GET" };

    request(req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setDirection(body);
      }
    });
  }, []);


  return (
    <StyledCard className="card game" >
        <div className="game-main flex">
            <h2>GAME!</h2>
            <p>Direction: {direction}</p>
        </div>
    </StyledCard>
  );
}
