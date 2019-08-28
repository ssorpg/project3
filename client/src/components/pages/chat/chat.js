// COMPONENTS
import React, { Component } from 'react';
import ChatInput from './chatinput';
import ChatMessage from './chatmessage';
import { Container } from '@material-ui/core';
import List from '@material-ui/core/List';

// CSS
// import './chat.css';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';
import GetWS from '../../../utils/getws';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: undefined,
      ws: undefined,
      messages: []
    };
  }

  ws = GetWS(window.location);

  root = {
    width: '100%',
    maxWidth: '90%'
  }

  componentDidMount() {
    this.GetData();

    console.log(this.ws);

    this.ws.onopen = () => {
      console.log('connected');
    }

    this.ws.onmessage = event => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(event.data);
      this.addMessage(message);
    }

    this.ws.onclose = () => {
      console.log('disconnected');
      // automatically try to reconnect on connection loss
      this.setState({ ws: GetWS(window.location) });
    }
  };

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/users/profile/`);
      await this.setState({ userData: userData.data });
      console.log(this.state.userData);
    }
    catch (error) {
      CheckError(error);
    }
  };

  addMessage = async message => {
    await this.setState(state => ({ messages: [...state.messages, message] }));

    this.updateScroll();
  };

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const today = new Date();
    const hours = today.getHours();
    const minutes = ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
    const seconds = ((today.getSeconds() < 10 ? '0' : '') + today.getSeconds());
    const time = hours + ":" + minutes + ":" + seconds;

    const message = {
      user: this.state.userData,
      message: messageString,
      time: time
    };

    this.ws.send(JSON.stringify(message));
    this.addMessage(message);
  };

  updateScroll = () => {
    const element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
  };

  render() {
    return (
      <>
        <Container id="chat" style={{ flex: '1 0 auto', height: '60vh', overflow: 'auto', padding: '50px' }}>
          <List className={this.root}>
            {
              this.state.messages.map((message, index) =>
                <ChatMessage
                  key={index}
                  user={message.user}
                  message={message.message}
                  time={message.time}
                />,
              )
            }
          </List>
        </Container>
        <br /><br />
        <ChatInput
        style={{ flexShrink: 0 }}
          ws={this.ws}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />
      </>
    )
  }
}
