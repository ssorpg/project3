// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import MakeComment from './makecomment';
import Comment from './comment';

// FUNCTIONS
import ax from 'axios';

export default class CommentController extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: props.thisPost.comments || [],
      alert: undefined
    };
  };

  handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('input')[0];

    const comment = {
      message: input.value
    };

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.makeComment(form, comment);
    submit.style.visibility = 'visible';
  };

  makeComment = async (form, comment) => {
    this.setState({ alert: undefined });

    try {
      const res = await ax.post(`/api/posts/${this.props.thisPost.id}/comments`, comment);

      this.setState({ comments: [...this.state.comments, res.data] });
      form.reset();
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  deleteComment = async (PostId, CommentId) => {
    this.setState({ alert: undefined });

    try {
      const removedComment = await ax.delete(`/api/posts/${PostId}/comments/${CommentId}`);

      const newComments = this.state.comments.filter(comment => { return comment.id !== removedComment.data.id; });
      this.setState({ comments: newComments });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  render() {
    return (
      <Container style={{ textAlign: 'center' }}>
        <MakeComment
          handleSubmit={this.handleSubmit}
          alert={this.state.alert}
        />
        {
          this.state.comments.length ?
            this.state.comments.map(comment => (
              <Comment
                key={comment.id}
                {...this.props}
                thisComment={comment}
                deleteComment={this.deleteComment}
              />
            ))
            : ''
        }
      </Container>
    );
  }
}

