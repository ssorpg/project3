import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LoginForm } from './form';

export default function Login() {
  return (
    <Row style={{ backgroundColor: 'white' }}>
      <Col>
        <h5>Login or Register to begin</h5>
        <LoginForm />
      </Col>
    </Row>
  );
}
