import React, { Component } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { LoginButton, Register } from './buttons';
import ax from 'axios';


export class LoginForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let formData = event.target;
    let inputs = formData.getElementsByTagName('input');
    let postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }

    this.login(postData);
  }

  login = async (postData) => {
    let res = await ax.post('/api/users', postData);

    if (res.status === 200) {
      window.location = `/profile/`;
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" {...this.props} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" {...this.props} />
          </Form.Group>
          <LoginButton />
          <Register />
        </Form>
      </div>
    )
  }

}

export class RegisterForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let formData = event.target;
    let inputs = formData.getElementsByTagName('input');
    let postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }

    this.postToDB(postData);
  }

  postToDB = async (postData) => {
    console.log(postData);
    const {
      name, email, password,
      password_match, photo
    } = postData;

    try {
      let register_results = await ax.post(
        '/api/users/register',
        {
          name: name,
          email: email,
          password: password,
          photo: photo
        }
      );

      if (register_results.status === 200) {
        const logged = await this.login(
          postData.email,
          postData.password
        );
      }
    } catch (error) {
      console.log('Error :', error.response);
    }
  }

  login = async (email, pass) => {
    let res = await ax.post('/api/users', { email: email, password: pass });

    if (res.status === 200) {
      window.location = `/create-community/`;
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" {...this.props} />
          </Form.Group>
          <Form.Group controlId="formGroupText">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter Name" {...this.props} />
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
          <LoginButton />
        </Form>
      </div>
    )
  }
}
