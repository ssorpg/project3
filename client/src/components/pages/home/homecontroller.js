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
    const loginData = {};

    for (let i = 0; i < inputs.length; i++) {
      loginData[inputs[i].name] = inputs[i].value;
    }

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.login(inputs[1], loginData);
    submit.style.visibility = 'visible';
  };

  login = async (password, loginData) => {
    this.setState({ alert: undefined });

    try {
      await ax.post('/api/users', loginData);
      
      window.location = '/profile';
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });

      password.value = '';
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