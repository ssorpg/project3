// COMPONENTS
import React, { Component } from 'react';
import Home from './home';

// FUNCTIONS
import ax from 'axios';

export default class HomeController extends Component {
  constructor() {
    super();

    this.state = {
      alert: undefined
    };
  };

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
    await this.login(inputs[1], postData);
    submit.style.visibility = 'visible';
  };

  login = async (password, postData) => {
    this.setState({ alert: undefined });

    try {
      await ax.post('/api/users', postData);
      window.location = '/profile';
    }
    catch (error) {
      console.log(error);
      password.value = '';
      this.setState({ alert: error.response.data });
    }
  };

  render() {
    return (
      <Home
        handleSubmit={this.handleSubmit}
        alert={this.state.alert}
      />
    );
  };
}