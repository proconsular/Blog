import React from 'react';
import './App.css';
import './style.css'

import Site from './primary/Site'

class App extends React.Component {
  render() {
    return (
      <div className="page">
        <Site />
      </div>
    );
}
}

export default App;
