// COMPONENTS
import React from 'react';
import { Nav, NavDropdown, Button } from 'react-bootstrap';

// IMAGES
import user from '../../../images/icons/svg/user.svg';

export default function NavbarRight({ logout, isAuth }) {
  function toggleLogin() {
    const loginForm = document.getElementById('login');

    if (loginForm.className === 'expander open') {
      loginForm.className = 'expander closed';
    }
    else {
      loginForm.className = 'expander open';
    }
  }

  return (
    <Nav className="nav navbar-nav navbar-right">
      {
        isAuth
          ? <NavDropdown className="" title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item href="/update-profile">Update Bio</NavDropdown.Item>
            <NavDropdown.Item href="/update-photo">Update Photo</NavDropdown.Item>
            <NavDropdown.Item href="/create-community">Create Community</NavDropdown.Item>
          </NavDropdown>
          : ''
      }
      {
        isAuth
          ? <div>
            <a
              className="btn btn-outline-info user-state-button dashboard"
              title="Dashboard"
              href="/profile"
            >
              <img src={user} alt="" />
            </a>
            <Button variant="danger"
              className="user-state-button logout"
              title="Log Out"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
          : <div>
            <Button variant="success"
              className="user-state-button login"
              title="Log In"
              onClick={toggleLogin}
            >
              Log In
            </Button>
            <a href="/register" className="btn btn-danger">
              Register
            </a>
          </div>
      }
    </Nav>
  )
}