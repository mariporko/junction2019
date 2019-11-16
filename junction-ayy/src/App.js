import React, { Fragment } from "react";
import { Greeting } from "./Greeting";
import { PublicTransport } from "./squares/PublicTransport";
import { Weather } from "./squares/Weather";
import { Residents } from "./squares/Residents";
import { Sustainability } from "./squares/Sustainability";
import { AyyInfo } from "./squares/AyyInfo";
import { Time } from "./squares/Time";
import "./App.css";

function App() {
  return (
    <Fragment>
      <header className="header flex">
        <Weather />
        <Greeting />
        <Time />
      </header>
      <main className="content-area flex">
        <div className="column-left">
          <div className="block-large block-main"> skjdhfkjsdh</div>
        </div>
        <div className="column-right">
          <div className="flex-item">
            <PublicTransport />
          </div>
          <div className="flex-item">
            <Residents />
          </div>
          <div className="flex-item">
            <Sustainability />
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
