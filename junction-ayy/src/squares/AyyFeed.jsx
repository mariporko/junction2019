import React from "react";
import { StyledCard } from "../StyledCard";
import news_circle from "../assets/news-circle.svg";

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
      <div className="card-header">
        <h3>AYY NEWS</h3>
      </div>

      <div className="card-content">
        {AYY_DATA.map((article, key) => {
          return (
            <div className="article" style={{ margin: "12px" }} key={key}>
              <h4>{article.title}</h4>
              <p className="text-small">{article.date}</p>
            </div>
          );
        })}
      </div>

      <div className="card-footer">
        <img
          className="circle-img margin-r-small"
          alt="news circle image"
          src={news_circle}
          style={{ width: "200px" }}
        />
      </div>
    </StyledCard>
  );
}

export function AyyFeedSummary() {
  const latestTitle = AYY_DATA[0].title;

  return (
    <StyledCard className="card-small ayy-feed">
      <div className="card-header">
        <h4>AYY NEWS</h4>
      </div>
      <div className="card-content">
        <p className="ayy-small-title">{latestTitle}</p>
      </div>
      <div className="card-footer">
        <img
          className="circle-img margin-r-small"
          alt="news circle image"
          src={news_circle}
          style={{ width: "100px" }}
        />
      </div>
    </StyledCard>
  );
}
