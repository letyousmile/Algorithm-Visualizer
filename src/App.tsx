import React from 'react';
import Footer from './Footer';
import Routes from './Router/Routes';

function App(): JSX.Element {
  return (
    <div>
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
