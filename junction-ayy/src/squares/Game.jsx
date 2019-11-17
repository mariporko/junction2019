import React, { useState, useEffect } from "react";
import { StyledCard } from "../StyledCard";

import raised_hands from "../assets/raised-hands.svg";
import cat_1 from "../assets/game-images/cat-1.jpeg";
import dog_1 from "../assets/game-images/dog-1.jpeg";

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

  if (direction === "") {
    return (
      <StyledCard className="card-large game">
        <div className="game-header">
          <h3 style={{ textAlign: "center" }}>GAME!</h3>
          <h4 style={{ margin: "12px", textAlign: "center" }}>
            Choose a picture that resembles your current feeling!
          </h4>
          <p style={{ margin: "12px", textAlign: "center" }}>
            Direction: {direction}
          </p>
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
          <button onClick={() => setDirection("U")}>Raise both hands</button>
        </div>
      </StyledCard>
    );
  } else if (direction === "L") {
    return (
      <StyledCard className="card-large game">
        <div className="game-header">
          <h3 style={{ textAlign: "center" }}>GAME!</h3>
          <h4 style={{ textAlign: "center" }}>You are a cat lover!</h4>
          <div className="game-main flex" style={{ flexDirection: "column" }}>
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
            </div>
            <button onClick={() => setDirection("U")}>
              Raise both hands to restart
            </button>
          </div>
        </div>
      </StyledCard>
    );
  } else if (direction === "R") {
    return (
      <StyledCard className="card-large game">
        <div className="game-header">
          <h3 style={{ textAlign: "center" }}>GAME!</h3>
          <h4 style={{ textAlign: "center" }}>You are a dog lover!</h4>
          <div className="game-main flex" style={{ flexDirection: "column" }}>
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
            </div>
            <button onClick={() => setDirection("U")}>
              Raise both hands to restart
            </button>
          </div>
        </div>
      </StyledCard>
    );
  } else {
    return (
      <StyledCard className="card-large game">
        <div className="game-header">
          <h3 style={{ textAlign: "center" }}>GAME!</h3>
          <h4 style={{ margin: "12px", textAlign: "center" }}>
            Choose a picture that resembles your current feeling!
          </h4>
          <p style={{ margin: "12px", textAlign: "center" }}>
            Direction: {direction}
          </p>
        </div>

        <div
          className="game-mode flex"
          style={{ justifyContent: "space-evenly", marginTop: "60px" }}
        >
          <div className="game-card flex" style={{ flexDirection: "column" }}>
            <img
              className="game-img"
              alt="game instruction image"
              src={cat_1}
              style={{
                height: "200px",
                paddingTop: "24px",
                marginBottom: "24px"
              }}
            />
            <p>Raise left hand to choose this</p>
            <button onClick={() => setDirection("L")}>Left</button>
          </div>
          <div className="game-card flex" style={{ flexDirection: "column" }}>
            <img
              className="game-img"
              alt="game instruction image"
              src={dog_1}
              style={{
                height: "200px",
                paddingTop: "24px",
                marginBottom: "24px"
              }}
            />
            <p>Raise right hand to choose this</p>
            <button onClick={() => setDirection("R")}>Right</button>
          </div>
        </div>
      </StyledCard>
    );
  }
}
