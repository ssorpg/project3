// COMPONENTS
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import LoginButton from '../../buttons';
import Modal from '../../modal';

// FUNCTIONS
import ax from 'axios';

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
          <LoginButton />
        </Form>
      </div>
    )
  }
}