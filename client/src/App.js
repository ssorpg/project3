import React, { Component } from 'react';
//import './App.css';
import Nav from './components/navbar.js';
import Profile from './components/pages/profile';
import  Footer  from './components/footer';
import Login from './components/pages/login';
import RegisterPage from './components/pages/register';
import Feed from './components/pages/feed';
import Friends from './components/pages/friends';
import Chat from './components/pages/chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/styles.css';


class TPN extends Component {
  render() {
    return (
      <div>
      <Nav />
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={RegisterPage} />
            <Route path="/feed" component={Feed} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/chat" component={Chat} />
          </Switch>
        </div>
      </Router>
      <Footer />
      </div>
    );
  };
}


export default TPN;
