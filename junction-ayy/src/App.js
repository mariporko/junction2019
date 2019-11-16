import React, { Fragment, useState } from "react";

import Carousel from 'nuka-carousel';

import { Greeting } from "./Greeting";
import { PublicTransport } from "./squares/PublicTransport";
import { Weather } from "./squares/Weather";
import { Residents } from "./squares/Residents";
import { Sustainability } from "./squares/Sustainability";
import { AyyInfo } from "./squares/AyyInfo";
import { Time } from "./squares/Time";
import { AyyFeed } from "./squares/AyyFeed";
import { Social } from "./squares/Social";

import "./App.css";

function App() {
  const [current, setCurrent] = useState(0);
  const indexList = [0, 1, 2];

  return (
    <Fragment>
      <header className="header">
        <Weather />
        <Greeting />
        <Time />
      </header>
      <main className="content-area">
        <div className="column-left">
          <div className="block-large block-main"></div>
          <div className="flex-item">
            <Carousel 
              slidesToShow={2} 
              autoplay 
              autoplayInterval={2000} 
              wrapAround
              slideIndex={indexList.filter(i => i !== current)}
            >
              <Sustainability />
              <AyyFeed />
              <Social />
            </Carousel>
          </div>
          <div className="flex-item">
            <Carousel 
              autoplayInterval={2000} 
              autoplay 
              wrapAround
              slideIndex={current}
              afterSlide={i => setCurrent(i)}
            >
              <Sustainability />
              <AyyFeed />
              <Social />
            </Carousel>
          </div>
        </div>
        <div className="column-right">
          <div className="flex-item">
            <PublicTransport />
          </div>
          <div className="flex-item">
            <Residents />
          </div>
        </div>
      </main>
      <footer className="footer">
        <AyyInfo />
      </footer>
    </Fragment>
  );
}

export default App;
