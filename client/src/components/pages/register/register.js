// COMPONENTS
import React from 'react';
import { RegisterForm } from '../../form';
import { Row, Col, Jumbotron } from 'react-bootstrap';

// CSS
import './register.css';

export default function RegisterPage() {
  return (
    <div className="Register" style={{ margin: '20px' }}>
      <Row>
        <Col className="col-md-6" style={{ flexBasis: 'initial' }}>
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
