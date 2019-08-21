// COMPONENTS
import React, { Component } from 'react';
import { Navbar as Nav, Row, Col } from 'react-bootstrap';
import { LoginForm } from '../../form';
import NavbarLeft from './navbarleft';
import NavbarRight from './navbarright';
import Searchbar from './searchbar';

// IMAGES
import close from '../../../images/icons/svg/cancel-circle.svg';
// import login from '../../images/icons/svg/user-plus.svg';
// import logout from '../../images/icons/svg/user-minus.svg';

// FUNCTIONS
import UserAuth from './utils/userauth';
import CheckError from '../../../utils/checkerror';
import ax from 'axios';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CommunityId: window.location.pathname.match(/\/community\/([0-9]*)/)
        ? window.location.pathname.match(/\/community\/([0-9]*)/)[1]
        : undefined,
      isAuth: false
    }
  }

  componentDidMount() {
    const isAuth = UserAuth();
    this.setState({ isAuth });
  }

  async logout() {
    try {
      const res = await ax.get('/api/users/logout');

      if (res.status === 200) {
        window.location = '/';
      }
    }
    catch (error) {
      CheckError(error);
    }
  }

  render() {
    return (
      <Nav bg="light" expand="lg" id='site-nav' style={{ marginBottom: '20px' }}>
        <Nav.Brand href="/">TPN</Nav.Brand>
        <Nav.Toggle aria-controls="basic-navbar-nav" />
        <Nav.Collapse id="basic-navbar-nav">
          <NavbarLeft
            CommunityId={this.state.CommunityId}
          />
          <NavbarRight
            logout={this.logout}
            isAuth={this.state.isAuth}
          />
          <Searchbar />
        </Nav.Collapse>
        <div className="expander closed" id="login">
          <button className="btn icon closed" onClick={this.toggleLogin}>
            <img src={close} alt="" />
          </button>
          <Row>
            <Col>
              <h5>Login or Register to begin</h5>
              <LoginForm />
            </Col>
          </Row>
        </div>
      </Nav>
    );
  }
}
