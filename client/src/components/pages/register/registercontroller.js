// COMPONENTS
import React, { Component } from 'react';
import Register from './register';

// FUNCTIONS
import ax from 'axios';

export default class RegisterController extends Component {
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
    const registerData = {};

    for (let i = 0; i < inputs.length; i++) {
      registerData[inputs[i].name] = inputs[i].value;
    }

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.register(registerData);
    submit.style.visibility = 'visible';
  };

  register = async registerData => {
    this.setState({ alert: undefined });

    try {
      await ax.post('/api/users/register', registerData);
      
      this.login(registerData);
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  login = async loginData => {
    this.setState({ alert: undefined });
    
    try {
      await ax.post('/api/users', loginData);

      window.location = '/profile';
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  render() {
    return (
      <Register handleSubmit={this.handleSubmit} alert={this.state.alert} />
    );
  };
}