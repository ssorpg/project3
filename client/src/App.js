// COMPONENTS
import React, { Component } from 'react';
// import './App.css';
import Navbar from './components/pages/navbar/navbar';
import Profile from './components/pages/profile/profile';
import HomePage from './components/pages/home/home';
import Register from './components/pages/register/register';
import Feed from './components/pages/feed/feed';
import Wall from './components/pages/wall/wall';
import Friends from './components/pages/friends/friends';
import CreateCommunity from './components/pages/create-community/create-community';
import Chat from './components/pages/chat/chat';
import UpdateProfile from './components/pages/update-profile/update-profile';
import SearchResults from './components/pages/search-results/search-results';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar as Nav } from 'react-bootstrap';
import CssBaseLine from '@material-ui/core/CssBaseLine';

// CSS
import './css/styles.css';

export default class TPN extends Component {
  render() {
    return (
      <div>
        <CssBaseLine />
        <Navbar />
        <Router>
          <div className="App" id="App">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/update-profile" component={UpdateProfile} />
              <Route exact path="/create-community" component={CreateCommunity} />
              <Route exact path="/community/:CommunityId" component={Feed} />
              {/* TODO: make friends tables/routes? */}
              <Route exact path="/community/:CommunityId/friends" component={Friends} />
              <Route exact path="/community/:CommunityId/friends/:UserId" component={Wall} />
              <Route exact path="/community/:CommunityId/chat" component={Chat} />
              <Route path="/search" component={SearchResults} />
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
        </Router>
        {/* <Nav style={{ position: 'fixed', bottom: '0' }}>
          <strong>© T P N</strong>
        </Nav> */}
        <aside id="popover" className="card bg-danger text-center">
          <h3 className="card-title"> </h3>
        </aside>
      </div>
    );
  };
}
