import React from 'react';
import { RegisterForm } from '../form';
import { Jumbotron, Col, Row } from 'react-bootstrap';
import '../../App.css'

export default function RegisterPage() {
    return (
        <div className="Register" style={{margin: '20px'}}>
            <Row>
                <Col>
                    <Jumbotron>
                        <RegisterForm />
                    </Jumbotron>
                </Col>
                <Col className='mobile-hide'>
                    <p>teststeest</p>
                </Col>
            </Row>
        </div>
    );
}
