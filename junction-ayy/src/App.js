import React, { Fragment } from 'react';
import { Greeting } from './Greeting';
import { PublicTransport } from './squares/PublicTransport';
import { Weather } from './squares/Weather';
import { Residents } from './squares/Residents';

function App() {
  return (
    <div className="flex-container">
      <header className="header">
        <Greeting />
      </header>
      <div className="flex-item">
        <PublicTransport />
      </div>
      <div className="flex-item">
        <Weather />
      </div>
      <div className="flex-item">
        <Residents />
      </div>
    </div>
  );
}

export default App;
