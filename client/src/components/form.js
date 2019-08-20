import React, { Component } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { LoginButton, Register } from './buttons';
import ax from 'axios';
import ImageUpload from './imageupload';

// LOGIN FORM 
// LOGIN FORM 
// LOGIN FORM 
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
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <LoginButton />
            <Register />
          </span>
        </Form>
      </div>
    )
  }

}


//REGISTER FORM
//REGISTER FORM
//REGISTER FORM
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
      name, email, password, password_match
    } = postData;

    try {
      let register_results = await ax.post(
        '/api/users/register',
        {
          name: name,
          email: email,
          password: password,
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
      window.location = `/update-profile/`;
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
          <LoginButton />
        </Form>
      </div>
    )
  }
}


//UPDATE FORM
//UPDATE FORM
//UPDATE FORM
export class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
    };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/users/profile/`);
      await this.setState({ userData: userData });
      console.log(this.state.userData);
    }
    catch (error) {
      console.log(error.response);
    }
  };

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
      bio, location
    } = postData;

    try {
      let register_results = await ax.put(
        '/api/users/update',
        {
          bio: bio,
          location: location,
          id: this.state.userData.data.id
        }
      );

      if (register_results.status === 200) {
        window.location = `/create-community/`;
      }
    } catch (error) {
      console.log('Error :', error.response);
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupPhoto">
          </Form.Group>
          <Form.Group controlId="formGroupBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control type="text" name="bio" placeholder="Tell me about yourself!" required {...this.props} />
          </Form.Group>
          <Form.Group controlId="formGroupText">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" placeholder="Westwood, LA" required {...this.props} />
          </Form.Group>
          {/* <ImageUpload /> */}
          <LoginButton />
        </Form>
      </div>
    )
  }
}