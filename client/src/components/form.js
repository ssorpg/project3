import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';

export function LoginForm(props) {
    return (
        <div>
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...props}/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...props}/>
                </Form.Group>
            </Form>
        </div>
    )
}

export function registerForm(props) {
    return (
        <div>
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...props}/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...props}/>
                </Form.Group>
            </Form>
        </div>
    )
}
