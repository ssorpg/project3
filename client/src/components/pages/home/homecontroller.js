// COMPONENTS
import React, { Component } from 'react';
import Home from './home';

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
    await this.login(postData);
    submit.style.visibility = 'visible';
  }

  login = async postData => {
    this.setState({ errorAlert: undefined });

    try {
      const res = await ax.post('/api/users', postData);

      console.log(res);

      window.location = `/profile`;
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <Home handleSubmit={this.handleSubmit} errorAlert={this.state.errorAlert} />
    );
  }
}