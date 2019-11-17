import React from "react";
import { StyledCard } from "../StyledCard";
import circle_img from "../assets/news-circle.svg";

const AYY_DATA = [
  {
    title:
      "Frans Cederlöf valittu Suomen ylioppilaskuntien liiton hallitukseen vuodelle 2020",
    date: "16.11.2019"
  },
  {
    title:
      "Tapio Hautamäki valittu Suomen ylioppilaskuntien liiton puheenjohtajaksi vuodelle 2020",
    date: "15.11.2019"
  },
  {
    title:
      "Kiinteistötiimin uusimmat vahvistukset - Jouni kehittää raportointia ja Joel vastaa asukkaiden kysymyksiin",
    date: "14.11.2019"
  },
  {
    title:
      "Maailman parasta opiskelija-asumista edistämässä Linnanisäntänä tai asukasneuvostossa",
    text:
      "AYY:lla asukkaat pääsevät monin tavoin vaikuttamaan omaan asumisviihtyvyyteen ja kehittämään asumista. Asukkaat voivat vaikuttaa linnanisäntinä, talokokouksissa, asukasneuvostossa ja asumisen yhteistyöelimessä. Asukastoimijat valitaan talokokouksissa marras-joulukuussa. Seuraa oman talokokouksen aikataulua talosi ilmoitustaululta.",
    date: "14.11.2019"
  }
];

export function AyyFeed() {
  return (
    <StyledCard className="card-large ayy-feed">
      <h3>AYY NEWS</h3>
      {AYY_DATA.map((article, key) => {
        return (
          <div className="article" key={key}>
            <h4>{article.title}</h4>
            <p className="text-small">{article.date}</p>
          </div>
        );
      })}
    </StyledCard>
  );
}

export function AyyFeedSummary() {
  const latestTitle = AYY_DATA[0].title;

  return (
    <StyledCard className="card-small ayy-feed flex">
      <div className="content">
        <h4 style={{ marginBottom: "12px" }}>AYY NEWS</h4>
        <p className="ayy-small-title margin-r-medium">{latestTitle}</p>
      </div>
      <img
        className="circle-img margin-r-small"
        alt="news circle image"
        src={circle_img}
        style={{ width: "120px" }}
      />
    </StyledCard>
  );
}
