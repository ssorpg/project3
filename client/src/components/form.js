import React from 'react';
import { Form, Dropdown } from 'react-bootstrap';

export function LoginForm(props) {
    return (
        <div>
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...props} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...props} />
                </Form.Group>
            </Form>
        </div>
    )
}

export function RegisterForm(props) {
    return (
        <div>
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...props} />
                </Form.Group>
                <Form.Group controlId="formGroupText">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...props} />
                </Form.Group>
                <Form.Group controlId="formGroupText">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...props} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...props} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" {...props} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Upload Profile Photo</Form.Label>
                    <Form.Control type="file" placeholder="Image" {...props} />
                </Form.Group>
                <Form.Group controlId="formGroupText">
                    <Form.Label>Choose Community</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Community List
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">The Jackson Family</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Walmart 7301</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Meme-a-holics 101</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
            </Form>
        </div>
    )
}
