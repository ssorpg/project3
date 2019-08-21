// COMPONENTS
import React from 'react';
import { RegisterForm } from '../../form';
import { Row, Col, Jumbotron } from 'react-bootstrap';

export default function RegisterPage() {
  return (
    <div className="Register" style={{ margin: '20px' }}>
      <Row>
        <Col>
          <Jumbotron>
            <RegisterForm />
          </Jumbotron>
        </Col>
        <Col className='mobile-hide'>
          <p>test test</p>
        </Col>
      </Row>
    </div>
  );
}
