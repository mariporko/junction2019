import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faSmog,
  faSun,
  faCloudRain,
  faSnowflake,
  faPooStorm
} from "@fortawesome/free-solid-svg-icons";

export function Weather() {
  const [data, setData] = useState({
    temperature: 0,
    weather_descriptions: [""],
    weather_icons: [""],
    feelslike: 0
  });

  useEffect(() => {
    const request = require("request");

    let req = {
      url:
        "http://api.weatherstack.com/current?access_key=aa24982083f1c3d55aed3be87a73678f&query=Espoo",
      method: "GET"
    };

    request(req, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        setData(JSON.parse(body).current);
      }
    });
  }, []);

  function weatherIcon() {
    if (data.weather_descriptions[0].toLowerCase().includes("cloud")) {
      return <FontAwesomeIcon icon={faCloud} />;
    } else if (data.weather_descriptions[0].toLowerCase().includes("sun")) {
      return <FontAwesomeIcon icon={faSun} />;
    } else if (
      data.weather_descriptions[0].toLowerCase().includes("snow") ||
      data.weather_descriptions[0].toLowerCase().includes("sleet")
    ) {
      return <FontAwesomeIcon icon={faSnowflake} />;
    } else if (data.weather_descriptions[0].toLowerCase().includes("thunder")) {
      return <FontAwesomeIcon icon={faPooStorm} />;
    } else if (
      data.weather_descriptions[0].toLowerCase().includes("rain") ||
      data.weather_descriptions[0].toLowerCase().includes("drizzle")
    ) {
      return <FontAwesomeIcon icon={faCloudRain} />;
    } else if (data.weather_descriptions[0].toLowerCase().includes("mist")) {
      return <FontAwesomeIcon icon={faSmog} />;
    }
  }

  return (
    <div className="weather">
      <div className="weather-main flex">
        <h2 className="margin-r-medium">{data.temperature} &#8451;</h2>
        <div className="weather-description">
          {weatherIcon()}
          <p className="body-info">{data.weather_descriptions[0]}</p>
        </div>
      </div>
      <div className="weather-feels">
        <p className="body-info">Feels like {data.feelslike} &#8451;</p>
      </div>
    </div>
  );
}
