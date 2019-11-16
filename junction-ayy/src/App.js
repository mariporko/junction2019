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
  
  const showSustainability = current === 0;
  const showAyyFeed = current === 1;
  const showSocial = current === 2;

  return (
    <Fragment>
      <header className="header flex">
        <Weather />
        <Greeting />
        <Time />
      </header>
      <main className="content-area flex">
        <div className="column-left">
          <div className="block-large block-main"></div>
          <div className="flex-item">
            <Carousel 
              autoplayInterval={4000} 
              autoplay 
              wrapAround
              slidesToShow={2}
              renderBottomCenterControls={<></>}
              renderCenterLeftControls={<></>}
              renderCenterRightControls={<></>}
              beforeSlide={(c) => setCurrent(c)}
            >
              <Sustainability />
              <AyyFeed />
              <Social />
            </Carousel>
          </div>
          <div className="flex-item">
            <div className="content-card">
              {showSustainability && <Sustainability />}
              {showAyyFeed &&<AyyFeed />}
              {showSocial && <Social />}
            </div>
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
      <footer className="footer flex">
        <AyyInfo />
      </footer>
    </Fragment>
  );
}

export default App;
