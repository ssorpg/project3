// COMPONENTS
import React, { Component } from 'react';
import ChatInput from './chatinput';
import ChatMessageContainer from './chatmessagecontainer';

// FUNCTIONS
import NewWs from '../../../utils/newws';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      YourProfile: props.YourProfile,
      messages: [],
      connected: undefined
    };
  };

  ws = NewWs(window.location);

  async componentDidMount() {
    //console.log(this.ws);

    this.ws.onopen = async event => {
      // this does not happen everytime we connect. if you refresh, sometimes it happens sometimes it doesnt.
      console.log('testing', event);
      await this.setState({ connected: this.state.YourProfile.name });
    }

    this.ws.onmessage = event => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(event.data);
      this.addMessage(message);
      // console.log(this.state.connected);
    }

    this.ws.onclose = () => {
      console.log('disconnected');
      // automatically try to reconnect on connection loss
      setTimeout(() => { this.ws = NewWs(window.location) }, 1000);
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

  addMessage = async message => {
    await this.setState({ messages: [...this.state.messages, message] });

    this.updateScroll();
  };

  updateScroll = () => {
    const element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
  };

  render() {
    return (
      <>
        <ChatMessageContainer messages={this.state.messages} />
        <br /><br />
        <ChatInput handleSubmit={this.handleSubmit} />
      </>
    )
  }
}
