import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSmog, faSun, faCloudRain, faSnowflake, faPooStorm } from '@fortawesome/free-solid-svg-icons';

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
    if (data.weather_icons[0].includes("cloud")) {
      return (<FontAwesomeIcon icon={faCloud} />);
    } else if (data.weather_icons[0].includes("sun")) {
      return (<FontAwesomeIcon icon={faSun} />);
    } else if (data.weather_icons[0].includes("snow") || data.weather_icons[0].includes("sleet")) {
      return (<FontAwesomeIcon icon={faSnowflake} />);
    } else if (data.weather_icons[0].includes("mist")) {
      return (<FontAwesomeIcon icon={faSmog} />); 
    }  else if (data.weather_icons[0].includes("thunder")) {
        return (<FontAwesomeIcon icon={faPooStorm} />); 
    } else if (data.weather_icons[0].includes("rain") || data.weather_icons[0].includes("drizzle")) {
      return (<FontAwesomeIcon icon={faCloudRain} />);
    }
  }

  return (
    <div className="weather">
      <h2>{data.temperature} &#8451;</h2>
      {weatherIcon()}
      <p>(Feels more like {data.feelslike} &#8451;)</p>
      <p>{data.weather_descriptions[0]}</p>
    </div>
  );
}
