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

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.postToDB(postData);
    submit.style.visibility = 'visible';
  }

  postToDB = async postData => {
    this.setState({ errorAlert: undefined });

    try {
      await ax.post('/api/users/register', postData);
      
      await this.login(postData);
    }
    catch (error) {
      console.log(error);
      this.setState({ errorAlert: error.response.data });
    }
  }

  login = async postData => {
    try {
      await ax.post('/api/users', postData);

      window.location = '/updateprofile/';
    }
    catch (error) {
      console.log(error);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <Register handleSubmit={this.handleSubmit} errorAlert={this.state.errorAlert} />
    );
  }
}