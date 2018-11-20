import React, { Component } from 'react';
// import './App.css';
import './css/style.css';
import Home from './components/Home';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (

      <div className="App">
        <NavBar />
        <Home />
      </div>

    );
  }
}

export default App;
