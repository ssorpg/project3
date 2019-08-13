import React from 'react';
import Container from '../container'
import { LoginForm } from '../form';
import { LoginButton, Register } from '../buttons';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="Login">
      <Container>
        <h1>Social Networking. Privatized.</h1>
        <p>Imagine a social network for just you and your friends and family. Well stop imagining. We made it. And it’s awesome.</p>
      </Container>
      <Container>
        <h5>Login or Register to begin</h5>
        <LoginForm />
        <Link to="/profile"><LoginButton /> </Link>
        <Link to="/register"><Register /></Link>
      </Container>
    </div>
  );
}

export default Login;
