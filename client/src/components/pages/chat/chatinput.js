// COMPONENTS
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';

// CSS
// import './chat.css';

export default class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }

  state = {
    message: '',
  }

  render() {
    return (
      <Container>
        <form
          className="chat"
          action="."
          onSubmit={
            e => {
              e.preventDefault()
              this.props.onSubmitMessage(this.state.message)
              this.setState({ message: '' })
            }
          }
        >
          <TextField
            label="Chat with your community!"
            style={{ margin: 8 }}
            placeholder='Enter message...'
            value={this.state.message}
            // multiline
            fullWidth
            onChange={e => this.setState({ message: e.target.value })}
            required
            margin="normal"
            variant="outlined"
          />
          {/* <Button type="submit" value={'Send'} variant="contained" color="primary">
            Send
        <Icon>send</Icon>
          </Button> */}
        </form>
      </Container>
    )
  }
}
