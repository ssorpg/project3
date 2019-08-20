import React, { Component } from 'react';
// import './App.css';
import Nav from './components/navbar.js';
import Profile from './components/pages/profile';
// import Footer from './components/footer';
import HomePage from './components/pages/home';
import RegisterPage from './components/pages/register';
import Feed from './components/pages/feed';
import Wall from './components/pages/wall';
import Friends from './components/pages/friends';
import createComm from './components/pages/create-community';
import Chat from './components/pages/chat';
import UpdateProfile from './components/pages/update-profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/styles.css';

export default class TPN extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Router>
          <div className="App" id="App">
            <Switch>
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/update-profile" component={UpdateProfile} />
              <Route exact path="/create-community" component={createComm} />
              <Route exact path="/community/:CommunityId" component={Feed} />
              <Route exact path="/community/:CommunityId/wall" component={Wall} />
              {/* TODO: make friends tables/routes? */}
              <Route exact path="/community/:CommunityId/friends" component={Friends} />
              <Route exact path="/community/:CommunityId/friends/:UserId" component={Wall} />
              <Route exact path="/community/:CommunityId/chat" component={Chat} />
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
        </Router>
        {/* <Footer /> */}
        <aside id="popover" className="card bg-danger text-center">
          <h3 className="card-title"> </h3>
        </aside>
      </div>
    );
  };
}
