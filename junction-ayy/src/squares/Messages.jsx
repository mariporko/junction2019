import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { StyledCard } from "../StyledCard";
import { MESSAGES } from "../building_information";

import messages from "../assets/messages-circle.svg";

export function Messages() {
  return (
    <StyledCard className="card-large social">
      <div className="card-header">
        <h3>Messages</h3>
      </div>

      <div className="card-content">
        {MESSAGES.map((message, key) => {
          const classN = message.important ? "message important" : "message";
          const whichIcon = message.important ? faExclamation : faEnvelope;

          return (
            <div className={classN} key={key}>
              <div
                className="text flex justify"
                style={{ margin: "12px 24px" }}
              >
                <div className="message flex" style={{ width: "30em" }}>
                  <FontAwesomeIcon
                    icon={whichIcon}
                    className="margin-r-medium"
                    style={{ width: "12px", color: "var(--colorWhite_900)" }}
                  />
                  <span>{message.text}</span>
                </div>
                <p className="from" style={{ color: "var(--colorWhite_600)" }}>
                  {"- "}
                  {message.from}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="card-footer"
        style={{
          textAlign: "center"
        }}
      >
        <img
          className="circle-img margin-r-small"
          alt="messages circle image"
          src={messages}
          style={{ width: "200px" }}
        />
      </div>
    </StyledCard>
  );
}

export function MessagesSummary() {
  const important = MESSAGES.filter(m => m.important).length;
  const other = MESSAGES.length - important;

  return (
    <StyledCard className="card-small social summary ">
      <div className="card-header">
        <h4>Messages</h4>
      </div>
      <div className="card-content">
        <p>
          <FontAwesomeIcon icon={faExclamation} /> {important} important
          messages
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> {other} other messags
        </p>
      </div>
      <div className="card-footer">
        <img
          className="circle-img margin-r-small"
          alt="messages circle image"
          src={messages}
          style={{ width: "100px", marginTop: "24px" }}
        />
      </div>
    </StyledCard>
  );
}
