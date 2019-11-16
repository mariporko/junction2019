import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { StyledCard } from "../StyledCard";
import { MESSAGES } from "../building_information";

export function Messages() {

  return (
    <StyledCard className="card social">
      <h2>Messages</h2>
      {MESSAGES.map((message, key) => {
        const classN = message.important ? "message important" : "message";
        const whichIcon = message.important ? faExclamation : faEnvelope;

        return(
          <div className={classN} key={key}>
            <p className="text"><FontAwesomeIcon icon={whichIcon} /> {message.text}</p>
            <p className="from"> {message.from}</p>
          </div>
        )
      })}
    </StyledCard>
  );
}

export function MessagesSummary() {
  const important = MESSAGES.filter(m => m.important).length;;
  const other = MESSAGES.length - important;

  return (
    <StyledCard className="card social summary">
      <h4>Messages</h4>
      <p><FontAwesomeIcon icon={faExclamation} /> {important} important messages</p>
      <p><FontAwesomeIcon icon={faEnvelope} /> {other} other messags</p>
    </StyledCard>
  );
}
