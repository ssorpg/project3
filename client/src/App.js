import React, { Component } from 'react';
//import './App.css';
import Nav from './components/navbar.js';
import Profile from './components/pages/profile';
import Footer from './components/footer';
import HomePage from './components/pages/home';
import RegisterPage from './components/pages/register';
import Feed from './components/pages/feed';
import Friends from './components/pages/friends';
import Chat from './components/pages/chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/styles.css';
import PrivateRoutes from './utils/privateroutes';
import UserAuth from './utils/userauth';

class TPN extends Component {
  state = {
    isAuth: true
  }

  componentDidMount() {
    const isAuth = UserAuth();
    this.setState({ isAuth: isAuth });  // setState is async - can either call it with await or set a variable if need to use state value immediately
    PrivateRoutes(isAuth);              // like we do here
  }

  render() {
    return (
      <div>
        <Nav isAuth={this.state.isAuth} />
        <Router>
          <div className="App" id="App">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/community/:CommunityId" component={Feed} />
              <Route exact path="/profile" component={Profile} />
              {/* TODO make friends tables/routes? */}
              <Route exact path="/friends" component={Friends} />
              <Route exact path="/chat" component={Chat} />
            </Switch>
          </div>
        </Router>
        <Footer />
        <aside id="popover" className="card bg-danger text-center">
          <h3 className="card-title"> </h3>
        </aside>
      </div>
    );
  };
}


export default TPN;
