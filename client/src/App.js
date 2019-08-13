import React, { Component } from 'react';
import './App.css';
import Nav from './components/navbar.js';
import Profile from './components/pages/profile';
import { Footer } from './components/footer';
import Login from './components/pages/login';
import RegisterPage from './components/pages/register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class TPN extends Component {
  render() {
    return (
      <div>
      <Nav />
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={RegisterPage} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
      <Footer />
      </div>
    );
  };
}


export default TPN;
