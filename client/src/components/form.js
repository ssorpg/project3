// COMPONENTS
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import LoginButton from './buttons';
import Modal from './modal';

// FUNCTIONS
import ax from 'axios';
//TODO CHANGE TO JUST RETURN ERROR OBJ
// import CheckError from '../utils/checkerror';

// LOGIN FORM
export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorAlert: undefined
    }
  }

  componentDidMount() {
    this.emailInput.focus();
  }

  handleSubmit = event => {
    event.preventDefault();
    const formData = event.target;
    const inputs = formData.getElementsByTagName('input');
    const postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }
    console.log(postData);
    this.login(postData);
  }

  login = async postData => {
    this.setState({ errorAlert: undefined });

    try {
      const res = await ax.post('/api/users', postData);
      console.log(res);
      if (res.status === 200) {
        window.location = `/profile`;
      }
      
    } catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
            : ''
        }
        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              ref={(input) => {
                this.emailInput = input
              }}
              {...this.props} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" {...this.props} />
          </Form.Group>
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <LoginButton />
          </span>
        </Form>
      </div>
    )
  }

}

//REGISTER FORM
export class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorAlert: undefined
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const formData = event.target;
    const inputs = formData.getElementsByTagName('input');
    const postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }

    this.postToDB(postData);
  }

  postToDB = async postData => {
    this.setState({ errorAlert: undefined });

    console.log(postData);
    const { name, email, password } = postData;

    try {
      await ax.post('/api/users/register',
        {
          name: name,
          email: email,
          password: password,
        });

      await this.login(postData.email, postData.password);
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  login = async (email, pass) => {
    this.setState({ errorAlert: undefined });

    try {
      await ax.post('/api/users', { email: email, password: pass });

      window.location = `/update-profile/`;
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
            : <Modal success={this.state.success} />
        }
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
export class UpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: undefined,
      errorAlert: undefined
    };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    this.setState({ errorAlert: undefined });

    try {
      const userData = await ax.get(`/api/users/profile/`);
      this.setState({ userData: userData });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = event.target;
    const inputs = formData.getElementsByTagName('input');
    const postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }

    this.postToDB(postData);
  }

  postToDB = async postData => {
    this.setState({ errorAlert: undefined });

    console.log(postData);
    const { bio, location } = postData;

    try {
      await ax.put('/api/users/update',
        {
          bio: bio,
          location: location,
          id: this.state.userData.data.id
        });

      window.location = `/profile`;
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
            : <Modal success={this.state.success} />
        }
        <Form onSubmit={this.handleSubmit} style={{ position: 'relative' }}>
          <Form.Group controlId="formGroupPhoto">
          </Form.Group>
          <Form.Group controlId="formGroupBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control type="text" name="bio" placeholder="Tell us about yourself!" required {...this.props} />
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