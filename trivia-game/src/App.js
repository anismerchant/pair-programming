import React, { Component } from 'react';
// import './App.css';
import './css/style.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path='/' exact render = {() => {return <Home />}}/> />
            <Route path='/home' exact render ={() => <Redirect to='/' />} />
            <Route path='/home/:category' exact render ={(props) => {return <Home {...props} />}} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
