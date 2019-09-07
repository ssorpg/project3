// COMPONENTS
import React, { Component } from 'react';
import ChatContainer from './chatcontainer';

// FUNCTIONS
import NewWs from '../../../utils/newws';
import PageLoadError from '../../../utils/pageloaderror';
import ax from 'axios';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messages: []
    };
  };

  ws = NewWs(window.location);

  async componentDidMount() {
    this.ws.onopen = async () => {
      console.log('connected');
      await this.getUsers();
    }

    this.ws.onmessage = event => {
      // on receiving a message, do the action associated with the message
      const message = JSON.parse(event.data);
      console.log(message);

      try {
        this.actions[message.action](message.payload);
      }
      catch (error) {
        console.log(error);
      }
    }

    this.ws.onclose = () => {
      console.log('disconnected');

      // automatically try to reconnect on connection loss
      setTimeout(() => { this.ws = NewWs(window.location) }, 1000);
    }
  };

  actions = {
    addUser: user => {
      this.setState({ users: [...this.state.users, user] });
    },

    removeUser: user => {
      this.setState({ users: this.state.users.filter(curUser => { return curUser !== user }) });
    },

    addMessage: async message => {
      await this.setState({ messages: [...this.state.messages, message] });

      this.updateScroll();
    }
  };

  getUsers = async () => {
    try {
      const res = await ax.get('/chat/users');

      this.setState({ users: res.data });
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  handleSubmit = async event => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    event.preventDefault();
    const form = event.target;
    
    const input = form.getElementsByTagName('input')[0];

    await this.ws.send(input.value);
    form.reset();
  };

  updateScroll = () => {
    const element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
  };

  render() {
    return (
      <ChatContainer
        {...this.state}
        handleSubmit={this.handleSubmit}
      />
    );
  };
}
