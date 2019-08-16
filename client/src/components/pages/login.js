import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LoginForm } from '../form';
import '../../App.css';

function Login() {
  return (
    <Row>
      <Col className='mobile-hide'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus beatae dolorum id dignissimos impedit, earum magnam eum debitis fugiat praesentium enim culpa eligendi magni dolor cupiditate expedita laboriosam reprehenderit! Incidunt?
      </p>
      </Col>
      <Col>
        <h5>Login or Register to begin</h5>
        <LoginForm>
        </LoginForm>
        {/* <Link to="/profile"> */}
        {/* <LoginButton /> */}
        {/* </Link> */}
      </Col>
    </Row>
  );
}

export default Login;
