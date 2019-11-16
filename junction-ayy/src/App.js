import React, { Fragment } from 'react';
import { Greeting } from './Greeting';
import { PublicTransport } from './PublicTransport';

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
        
      </div>
    </div>
  );
}

export default App;
