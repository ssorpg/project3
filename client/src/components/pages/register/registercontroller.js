// COMPONENTS
import React, { Component } from 'react';
import Register from './register';

// FUNCTIONS
import ax from 'axios';

export default class HomeController extends Component {
  constructor() {
    super();

    this.state = {
      errorAlert: undefined
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const form = event.target;
    const inputs = form.getElementsByTagName('input');
    const postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }

    // console.log(postData);

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.postToDB(postData);
    submit.style.visibility = 'visible';
  }

  postToDB = async postData => {
    this.setState({ errorAlert: undefined });

    // console.log(postData);

    const { name, email, password } = postData;

    try {
      await ax.post('/api/users/register',
        {
          name: name,
          email: email,
          password: password,
        }
      );

      await this.login(email, password);
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  login = async (email, password) => {
    try {
      await ax.post('/api/users', { email: email, password: password });

      window.location = `/update-profile/`;
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <Register handleSubmit={this.handleSubmit} errorAlert={this.state.errorAlert} />
    );
  }
}