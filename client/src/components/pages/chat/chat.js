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

let URL;

if (window.location.origin.indexOf('https') === 0) {
  URL = 'wss://localhost:3001'
} else {
  URL = 'ws://localhost:3001'
}

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      messages: [],
    };
  }
  root = {
    width: '100%',
    maxWidth: 360,
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.GetData();

    this.ws.onopen = () => {
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  };

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/users/profile/`);
      this.setState({ userData: userData });
      console.log(this.state.userData.data);
    }
    catch (error) {
      CheckError(error);
    }
  };

  addMessage = message => {
    this.setState(state => ({
      messages: [...state.messages, message],
    }));
    this.updateScroll();
  }

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    let today = new Date();
    let hours = today.getHours();
    let minutes = ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
    let seconds = ((today.getSeconds() < 10 ? '0' : '') + today.getSeconds());
    let time = hours + ":" + minutes + ":" + seconds;

    const message = {
      name: this.state.userData.data.name,
      message: messageString,
      time: time
    };
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  updateScroll = () => {
    var element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
  }
  render() {
    return (
      <>
        <Container id="chat" style={{ height: '500px', overflow: 'auto', padding: '50px' }}>
          <List className={this.root}>
            {
              this.state.messages.map((message, index) =>
                <ChatMessage
                  key={index}
                  message={message.message}
                  name={message.name}
                  user={this.state.userData.data}
                  time={message.time}
                />,
              )
            }
          </List>
        </Container>
        <br /><br />
        <ChatInput
          ws={this.ws}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />
      </>
    )
  }
}
