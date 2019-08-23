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
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './components/footer';

// CSS
import './css/styles.css';

export default class TPN extends Component {
  render() {
    return (
      <>
        <div style={{ minHeight: 'calc( 100vh - 100px )' }}>
          <CssBaseline />
          <Navbar isAuth={this.state.isAuth} CommunityId={this.state.CommunityId} />
          <Router>
            <div className="App" id="App" style={{ minHeight: '374px' }}>
              <Switch>
                <Route exact path="/register" component={this.state.isAuth ? Profile : Register} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/update-profile" component={UpdateProfile} />
                <Route exact path="/create-community" component={CreateCommunity} />
                <Route exact path="/community/:CommunityId" component={Feed} />
                {/* TODO: make friends tables/routes? */}
                <Route exact path="/community/:CommunityId/friends" component={Friends} />
                <Route exact path="/community/:CommunityId/friends/:UserId" component={Wall} />
                <Route exact path="/community/:CommunityId/chat" component={Chat} />
                <Route path="/search" component={SearchResults} />
                <Route path="/" component={this.state.isAuth ? Profile : HomePage} />
              </Switch>
            </div>
          </Router>
          <aside id="popover" className="card bg-danger text-center">
            <h3 className="card-title"> </h3>
          </aside>
        </div>
        <Footer />
      </>
    );
  };
}
