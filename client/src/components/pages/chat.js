import React, { Component } from 'react'
import ChatInput from '../chatinput'
import ChatMessage from '../chatmessage'
import ax from 'axios';
import '../../css/chat.css';
import CheckError from '../../utils/checkerror';

const URL = 'ws://localhost:3001'

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      messages: [],
    };
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.GetData();

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
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

    console.log(this.state);
    console.log(this.props);
  };

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/users/profile/`);

      this.setState({ userData: userData });
    }
    catch (error) {
      CheckError(error);
    }
  };

  addMessage = message => {
    this.setState(state => ({
      messages: [message, ...state.messages]
    }));
  }

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = {
      name: this.state.userData.data.name,
      message: messageString
    };
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    return (
      <div className="chat">
        {/* { this.state.userData ?
        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id={'name'}
            value={this.state.userData.data.name}
            //onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        : ''
        } */}
        <ChatInput
          ws={this.ws}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />
        {
          this.state.messages.map((message, index) =>
            <ChatMessage
              key={index}
              message={message.message}
              name={message.name}
            />,
          )
        }

      </div>
    )
  }
}

