import React from 'react';
import Container from '../container'
import { LoginForm } from '../form';
import { LoginButton, Register } from '../buttons';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login">
      <Container>
        <h5>Login or Register to begin</h5>
        <LoginForm />
        {/* <Link to="/profile"> */}
          {/* <LoginButton /> */}
        {/* </Link> */}
      </Container>
    </div>
  );
}

export default Login;
