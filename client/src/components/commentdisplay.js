// COMPONENTS
import React, { Component } from 'react';

// FUNCTIONS
import ax from 'axios';
import GetYourId from '../utils/getyourid';

export default class CommentDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      YourId: GetYourId(),
      comment: props.comment
    }
  }

  deleteComment = async event => {
    try {
      event.preventDefault();

      await ax.delete(`/api/posts/${this.state.comment.PostId}/comments/${this.state.comment.id}`);

      const commentElement = document.getElementById(`comment${this.state.comment.id}`);
      commentElement.style.display = 'none';
    }
    catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <p id={`comment${this.state.comment.id}`}>
        <strong>{this.state.comment.author.name}</strong>: <span id={`comment${this.state.comment.id}Message`}>{this.state.comment.message}</span>
        {
          this.state.YourId === this.state.comment.author.id ?
            <span>
              <button type="submit" onClick={this.deleteComment} style={{ display: 'inline-block', marginLeft: '10px', padding: '0 1px' }}>Delete</button>
            </span>
            : ''
        }
      </p>
    )
  }
}
