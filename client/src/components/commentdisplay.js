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

  handleEditComment = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('input')[0];
    const message = input.value;

    const post = {
      message: message
    };

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.postToDB(post);
    submit.style.visibility = 'visible';

    const commentElement = document.getElementById(`comment${this.state.comment.id}Message`);
    commentElement.innerHTML = post.message;
  }

  postToDB = async data => {
    try {
      await ax.put(`/api/posts/${this.state.comment.PostId}/comments/${this.state.comment.id}`, data);
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
              <form onSubmit={this.handleEditComment}>
                <input type="text" name="feed-comment" placeholder="Make edit" style={{ minWidth: '200px', marginTop: '10px', padding: '1px' }} />
                <button type="submit" value="submit" style={{ marginLeft: '10px', padding: '0 2px' }}>Edit</button>
              </form>
            </span>
            : ''
        }
      </p>
    )
  }
}
