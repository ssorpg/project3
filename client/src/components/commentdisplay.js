// COMPONENTS
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

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
      <p id={`comment${this.state.comment.id}`} style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
        <span>
          <strong>{this.state.comment.author.name}</strong>: <span id={`comment${this.state.comment.id}Message`}>{this.state.comment.message}</span>
        </span>
        {
          this.state.YourId === this.state.comment.author.id ?
            <Button type="submit" onClick={this.deleteComment} style={{ display: 'inline-block', marginLeft: '10px', padding: 0 }}><DeleteIcon /></Button>
            : ''
        }
      </p>
    )
  }
}
