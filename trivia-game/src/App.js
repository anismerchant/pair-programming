import React, { Component } from 'react';
// import './App.css';
import './css/style.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Category from './components/Category';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path='/' exact render = {() => {return <Home />}}/> />
            {/* <Route path='/home' exact render ={() => <Redirect to='/' />} /> */}
            <Route path='/:category' exact render ={() => {return <Category />}} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
