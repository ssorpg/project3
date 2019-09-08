// COMPONENTS
// the controller for each page contains all the page's logic, and as little styling and html as possible
// other files in each page folder contain the styling and html, and as little logic as possible
// this way we can keep state consistent between sibling components

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/pages/navbar/navbar';
import Profile from './components/pages/profile/profile';
import RegisterController from './components/pages/register/registercontroller';
import UpdateProfileController from './components/pages/updateprofile/updateprofilecontroller';
import JoinCommunityController from './components/pages/joincommunity/joincommunitycontroller';
import CreateEventController from './components/pages/createevent/createeventcontroller';
import Feed from './components/pages/feed/feed';
import FriendsController from './components/pages/friends/friendscontroller';
import Wall from './components/pages/wall/wall';
import EventController from './components/pages/events/eventcontroller';
import ChatController from './components/pages/chat/chatcontroller';
import SearchResultsController from './components/pages/searchresults/searchresultscontroller';
import HomeController from './components/pages/home/homecontroller';
import Footer from './components/footer';

// CSS
import './general.css';
import './App.css';

// FUNCTIONS
import UserAuth from './utils/userauth';
import GetYourProfile from './utils/getyourprofile';

export default class TPN extends Component {
  constructor() { // it's only necessary to define props in constructor if you use them in this.state
    super(); // class components automatically inherit props as this.props from components that import them once the constructor completes anyway

    this.state = { // these cannot be changed once a page loads
      isAuth: UserAuth(),
      YourProfile: undefined,
      CommunityId: window.location.pathname.match(/\/community\/([0-9]*)/) ?
        parseInt(window.location.pathname.match(/\/community\/([0-9]*)/)[1])
        : undefined,
      FriendId: window.location.pathname.match(/\/friends\/([0-9]*)/) ?
        parseInt(window.location.pathname.match(/\/friends\/([0-9]*)/)[1])
        : undefined,
      EventId: window.location.pathname.match(/\/events\/([0-9]*)/) ?
        parseInt(window.location.pathname.match(/\/events\/([0-9]*)/)[1])
        : undefined,
    }
  }

  // this line is where props are inherited as this.props in a class component even if not called in constructor

  componentDidMount = async () => {
    if (this.state.isAuth) {
      this.setState({ YourProfile: await GetYourProfile() });
    }
  };

  render() {
    if (!this.state.YourProfile && this.state.isAuth) { // '&& this.state.isAuth' so people who haven't logged in can still see the home page
      return <div />
    }

    return (
      <div className="App flex-col">
        <CssBaseline />
        {
          this.state.isAuth ?
            <Navbar {...this.state} />
            : ''
        }
        <Router>
          <div className="flex-default">
            <Switch>
              <Route exact path="/register" render=
                {
                  () => this.state.isAuth ?
                    <Profile {...this.state} />
                    : <RegisterController {...this.state} />
                }
              />
              <Route exact path="/profile" render={() => <Profile {...this.state} />} />
              <Route exact path="/updateprofile" render={() => <UpdateProfileController {...this.state} />} />
              <Route exact path="/joincommunity" render={() => <JoinCommunityController {...this.state} />} />
              <Route exact path="/createevent" render={() => <CreateEventController {...this.state} />} />
              <Route exact path="/community/:CommunityId" render={() => <Feed {...this.state} />} />
              <Route exact path="/community/:CommunityId/friends" render={() => <FriendsController {...this.state} />} />
              <Route exact path="/community/:CommunityId/friends/:UserId" render={() => <Wall {...this.state} />} />
              <Route exact path="/community/:CommunityId/events/:EventId" render={() => <EventController {...this.state} />} />
              {/* <Route exact path="/community/:CommunityId/chat" render={() => <Chat {...this.state} />} /> */}
              <Route exact path="/chat" render={() => <ChatController {...this.state} />} />
              <Route path="/search" render={() => <SearchResultsController {...this.state} />} />
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
          {/* we actually need the single space in the h3 or the div is not rendered */}
          <h3 className="card-title"> </h3>
        </aside>
        <Footer className="stick-to-bottom" />
      </div>
    );
  };
}
