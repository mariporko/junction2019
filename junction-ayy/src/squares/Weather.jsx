import React, { useState, useEffect } from "react";

export function Weather() {
  const [data, setData] = useState({
    temperature: 0,
    weather_descriptions: [""],
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

  return (
    <div className="weather">
      <h2>{data.temperature} &#8451;</h2>
      <p>(Feels more like {data.feelslike} &#8451;)</p>
      <p>{data.weather_descriptions[0]}</p>
    </div>
  );
}
