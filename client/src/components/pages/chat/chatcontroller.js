// COMPONENTS
import React, { Component } from 'react';
import ChatInput from './chatinput';
import ChatMessageContainer from './chatmessagecontainer';

// FUNCTIONS
import GetYourProfile from '../../../utils/getyourprofile';
import NewWs from '../../../utils/newws';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      userData: undefined,
      messages: [],
      connected: undefined,
    };
  };

  ws = NewWs(window.location);

  async componentDidMount() {
    this.setState({ userData: await GetYourProfile() });
    //console.log(this.ws);

    this.ws.onopen = async (event) => {
      //this does not happen everytime we connect. if you refresh, sometimes it happens sometimes it doesnt.
      console.log('testing');
      await this.setState({ connected: this.state.userData.name });
    }

    this.ws.onmessage = event => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(event.data);
      this.addMessage(message);
      //console.log(this.state.connected);
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

    const message = {
      user: this.state.userData,
      text: input.value,
      time: this.getFormattedTime()
    };

    await this.ws.send(JSON.stringify(message));
    form.reset();
    this.addMessage(message);
  };

  getFormattedTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
    const seconds = ((today.getSeconds() < 10 ? '0' : '') + today.getSeconds());
    const time = hours + ":" + minutes + ":" + seconds;

    return time;
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
        { //so the code below is to show the "user has connected" only if connected in state is defined. pretty self explanatory
          this.state.connected ? <p>{this.state.connected} has connected</p>
          : ''}
        <ChatMessageContainer messages={this.state.messages} />
        <br /><br />
        <ChatInput
          ws={this.ws}
          handleSubmit={this.handleSubmit}
        />
      </>
    )
  }
}
