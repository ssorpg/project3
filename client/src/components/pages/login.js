import React from 'react';
import Nav from '../navbar';
import Container from '../container'
import { LoginForm } from '../form';
import { LoginButton, Register } from '../buttons';
import { Footer } from '../footer';

function Login() {
  return (
    <div className="Login">
      <Nav />
      <Container>
        <h1>Social Networking. Privatized.</h1>
        <p>Imagine a social network for just you and your friends and family. Well stop imagining. We made it. And it’s awesome.</p>
      </Container>
      <Container>
        <h5>Login or Signup to begin</h5>
        <LoginForm />
        <LoginButton /> <Register />
      </Container>
      <Footer fixed="bottom"/>
    </div>
  );
}

export default Login;
