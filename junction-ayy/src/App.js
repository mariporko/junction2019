import React, { Fragment } from 'react';
import { Greeting } from './Greeting';
import { PublicTransport } from './PublicTransport';

function App() {
  return (
    <Fragment>
      <Greeting />
      <PublicTransport />
    </Fragment>
  );
}

export default App;
