import React, { Component } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { LoginButton, Register } from './buttons';
import ax from 'axios';
import Login from './pages/login';

function handleSubmit(formData) {
    let inputs = formData.getElementsByTagName('input');
    let postData = {};

    for (let i = 0; i < inputs.length; i++) {
        postData[inputs[i].name] = inputs[i].value;
    }

    // console.log(postData);
    postToDB(postData);
}
async function login(email, pass) {
    let res = await ax.post('/api/users', { email: email, password: pass });
    // todo dont need user id anymore on profile page we'll check if logged in
    // todo profile page decodes hash and gets then serves user data when go to /profile/
    // todo if we add an id to /profile/45 we look for this user and if you share a community and then show data
    console.log(res.data.userId);
    if (res.status === 200) {
        window.location = `/profile/`;
    }
}

async function postToDB(postData) {
    try {
        let res = await ax.post('/api/users/register', postData);

        if (res.status === 200) {
            login(postData.email, postData.password);
        }
    } catch (error) {
        console.log('E R R O R  - Line 21 :', error);
    }
    
}

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.render.bind(this);
    }
    componentDidMount() {
        this.form.current.addEventListener('submit', event => {
            event.preventDefault();
            console.log('submitted');
        });
    }

    render() {
        return (
            <div>
                <Form ref={this.form}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...this.props} />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...this.props} />
                    </Form.Group>
                    <LoginButton />
                    <Register />
                </Form>
            </div>
        )
    }

}

export class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.render.bind(this);
    }
    componentDidMount() {
        this.form.current.addEventListener('submit', function (event) {
            event.preventDefault();
            handleSubmit(this);
        });
    }

    render() {
        return (
            <div>
                <Form ref={this.form}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" {...this.props} />
                    </Form.Group>
                    <Form.Group controlId="formGroupText">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter email" {...this.props} />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" {...this.props} />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="password_match" placeholder="Confirm Password" {...this.props} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Upload Profile Photo</Form.Label>
                        <Form.Control type="file" name="photo" placeholder="Image" {...this.props} />
                    </Form.Group>
                    <Form.Group controlId="formGroupText">
                        <Form.Label>Choose Community</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Community List
                        </Dropdown.Toggle>

                            <Dropdown.Menu name="community">
                                <Dropdown.Item href="#/action-1">The Jackson Family</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Walmart 7301</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Meme-a-holics 101</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <LoginButton />
                </Form>
            </div>
        )
    }
}
