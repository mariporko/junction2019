import React, { useState, useEffect } from "react";
import { StyledCard } from "../StyledCard";

import raised_hands from "../assets/raised-hands.svg";

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
    <StyledCard className="card game">
      <div className="game-header">
        <h3>GAME!</h3>
        <p style={{ margin: "12px" }}>Direction: {direction}</p>
      </div>
      <div className="game-main flex" style={{ flexDirection: "column" }}>
        <img
          className="game-img"
          alt="game instruction image"
          src={raised_hands}
          style={{
            width: "200px",
            paddingTop: "70px",
            marginBottom: "24px"
          }}
        />
        <p>Raise both hands to play game!</p>
      </div>
    </StyledCard>
  );
}
