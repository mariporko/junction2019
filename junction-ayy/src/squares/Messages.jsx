import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { StyledCard } from "../StyledCard";
import { MESSAGES } from "../building_information";

import messages from "../assets/messages-circle.svg";

export function Messages() {
  return (
    <StyledCard className="card-large social">
      <h3>Messages</h3>
      {MESSAGES.map((message, key) => {
        const classN = message.important ? "message important" : "message";
        const whichIcon = message.important ? faExclamation : faEnvelope;

        return (
          <div className={classN} key={key}>
            <div
              className="text flex"
              style={{ justifyContent: "space-between", margin: "12px 24px" }}
            >
              <div className="message flex" style={{ width: "35em" }}>
                <FontAwesomeIcon
                  icon={whichIcon}
                  className="margin-r-medium"
                  style={{ width: "12px" }}
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
    </StyledCard>
  );
}

export function MessagesSummary() {
  const important = MESSAGES.filter(m => m.important).length;
  const other = MESSAGES.length - important;

  return (
    <StyledCard
      className="card-small social summary flex"
      style={{ justifyContent: "space-between" }}
    >
      <div className="content">
        <h4 style={{ marginBottom: "12px" }}>Messages</h4>
        <p>
          <FontAwesomeIcon icon={faExclamation} /> {important} important
          messages
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> {other} other messags
        </p>
      </div>
      <img
        className="circle-img margin-r-small"
        alt="messages circle image"
        src={messages}
        style={{ width: "120px", marginRight: "12px" }}
      />
    </StyledCard>
  );
}
