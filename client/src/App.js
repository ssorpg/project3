import React, { Component } from 'react';
import './App.css';
import Login from './pages/login';
import RegisterPage from './pages/register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class TPN extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </div>
      </Router>
    );
  };
}

export default TPN;
