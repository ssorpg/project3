// COMPONENTS
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// CSS
import './chat.css';

export default class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }

  state = {
    message: '',
  }

  render() {
    return (
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
        <input
          className="chat"
          type="text"
          placeholder={'Enter message...'}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
          required
        />
        <button type="submit" value={'Send'}> Send </button>
      </form>
    )
  }
}
