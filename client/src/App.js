import React, { Component } from 'react';
import './App.css';
import Nav from './components/navbar.js';
import Profile from './components/pages/profile';
import Nav from './components/navbar';
import Container from './components/container'
import { LoginForm } from './components/form';
import { LoginButton, Register } from './components/buttons';
import { Footer } from './components/footer';
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


export default TPN;
