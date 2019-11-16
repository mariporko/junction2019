import React from "react";
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
    <div className="flex-container">
      <header className="header">
        <Weather />
        <Greeting />
        <Time />
      </header>
      <div className="flex-item">
        <PublicTransport />
      </div>
      <div className="flex-item">
        <Residents />
      </div>
      <div className="flex-item">
        <Sustainability />
      </div>
      <footer className="footer">
        <AyyInfo />
      </footer>
    </div>
  );
}

export default App;
