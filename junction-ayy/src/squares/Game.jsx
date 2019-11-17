import React, { useState, useEffect } from "react";
import { StyledCard } from "../StyledCard";

import raised_hands from "../assets/raised-hands.svg";
import cat_lover from "../assets/cat-lover.svg";
import dog_lover from "../assets/dog-lover.svg";
import cat_1 from "../assets/game-images/cat-1.jpeg";
import dog_1 from "../assets/game-images/dog-1.jpeg";

export function Game() {
  const [direction, setDirection] = useState("");
  const [gameOn, setGameOn] = useState(false);

  useEffect(() => {
    const request = require("request");
    let req = { url: "http://localhost:5000/dir", method: "GET" };

    request(req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setDirection(body);
      }
    });
  }, []);

  function onDown(e) {
    setDirection(e.key.toUpperCase());
  }

  useEffect(() => {
    window.addEventListener("keydown", onDown);
  });

  useEffect(() => {
    if (direction === "U") {
      setGameOn(true);
    }
  }, [direction]);

  if (gameOn && direction === "U") {
    return (
      <StyledCard className="card-large game">
        <div className="game-header">
          <h3 style={{ textAlign: "center" }}>GAME!</h3>
          <h4 style={{ margin: "12px", textAlign: "center" }}>
            Choose a picture that resembles your current feeling!
          </h4>
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
          </div>
        </div>
      </StyledCard>
    );
  } else if (gameOn && direction === "L") {
    return (
      <StyledCard className="card-large game">
        <div className="game-header">
          <h3 style={{ textAlign: "center" }}>GAME!</h3>
          <h4 style={{ margin: "12px", textAlign: "center" }}>
            You are a cat lover!
          </h4>
        </div>
        <div className="game-main flex" style={{ flexDirection: "column" }}>
          <img
            className="game-img"
            alt="game instruction image"
            src={cat_lover}
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
  } else if (gameOn && direction === "R") {
    return (
      <StyledCard className="card-large game">
        <div className="game-header">
          <h3 style={{ textAlign: "center" }}>GAME!</h3>
          <h4 style={{ margin: "12px", textAlign: "center" }}>
            You are a dog lover!
          </h4>
        </div>
        <div className="game-main flex" style={{ flexDirection: "column" }}>
          <img
            className="game-img"
            alt="game instruction image"
            src={dog_lover}
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
  } else {
    return (
      <StyledCard className="card-large game">
        <div className="game-header">
          <h3 style={{ textAlign: "center" }}>GAME!</h3>
          <h4 style={{ margin: "12px", textAlign: "center" }}>
            Choose a picture that resembles your current feeling!
          </h4>
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
}
