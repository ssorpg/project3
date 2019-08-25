// COMPONENTS
import React, { Component } from 'react';
// import './App.css';
import Navbar from './components/pages/navbar/navbar';
import Profile from './components/pages/profile/profile';
import HomeController from './components/pages/home/homecontroller';
import RegisterController from './components/pages/register/registercontroller';
import Feed from './components/pages/feed/feed';
import Wall from './components/pages/wall/wall';
import FriendsController from './components/pages/friends/friendscontroller';
import CreateCommunity from './components/pages/create-community/create-community';
import Chat from './components/pages/chat/chat';
import UpdateProfile from './components/pages/update-profile/update-profile';
import SearchResults from './components/pages/search-results/search-results';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './components/footer';

// CSS
import './css/styles.css';

// FUNCTIONS
import UserAuth from './utils/userauth';
import GetYourId from './utils/getyourid';

export default class TPN extends Component {
  constructor(props) {
    super(props);

    this.state = { // these cannot be changed once a page loads
      isAuth: UserAuth(),
      YourId: GetYourId(),
      CommunityId: window.location.pathname.match(/\/community\/([0-9]*)/) ?
        parseInt(window.location.pathname.match(/\/community\/([0-9]*)/)[1])
        : undefined,
      UserId: window.location.pathname.match(/\/friends\/([0-9]*)/) ?
        parseInt(window.location.pathname.match(/\/friends\/([0-9]*)/)[1])
        : undefined
    }
  }

  render() {
    return (
      <>
        <div style={{ minHeight: 'calc( 100vh - 120px )' }}>
          <CssBaseline />
          <Navbar isAuth={this.state.isAuth} CommunityId={this.state.CommunityId} />
          <Router>
            <div className="App" id="App" style={{ minHeight: '374px' }}>
              <Switch>
                <Route exact path="/register" render=
                  {
                    () => this.state.isAuth ?
                      <Profile {...this.state} />
                      : <RegisterController {...this.state} />
                  }
                />
                <Route exact path="/profile" render={() => <Profile {...this.state} />} />
                <Route exact path="/update-profile" render={() => <UpdateProfile {...this.state} />} />
                <Route exact path="/create-community" render={() => <CreateCommunity {...this.state} />} />
                <Route exact path="/community/:CommunityId" render={() => <Feed {...this.state} />} />
                {/* TODO: make friends tables/routes? */}
                <Route exact path="/community/:CommunityId/friends" render={() => <FriendsController {...this.state} />} />
                <Route exact path="/community/:CommunityId/friends/:UserId" render={() => <Wall {...this.state} />} />
                <Route exact path="/community/:CommunityId/chat" render={() => <Chat {...this.state} />} />
                <Route path="/search" render={() => <SearchResults {...this.state} />} />
                <Route path="/" render=
                  {
                    () => this.state.isAuth ?
                      <Profile {...this.state} />
                      : <HomeController {...this.state} />
                  }
                />
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
