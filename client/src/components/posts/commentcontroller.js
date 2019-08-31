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
      comments: props.post.comments ?
        props.post.comments
        : [],
      errorAlert: undefined
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('input')[0];

    const post = {
      message: input.value
    };

    input.value = '';

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.postToDB(post);
    submit.style.visibility = 'visible';
  };

  postToDB = async data => {
    this.setState({ errorAlert: undefined });

    try {
      const res = await ax.post(`/api/posts/${this.props.post.id}/comments`, data);

      this.setState({ comments: [...this.state.comments, res.data] });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  };

  deleteComment = async event => {
    this.setState({ errorAlert: undefined });

    const commentInfo = event.target.dataset.id ?
      event.target.dataset
      : event.target.parentNode.dataset;

    try {
      const removedComment = await ax.delete(`/api/posts/${commentInfo.postid}/comments/${commentInfo.id}`);

      const newRemovedComments = this.state.comments.filter(comment => { return comment.id !== removedComment.data.id; });
      this.setState({ comments: newRemovedComments });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  };

  render() {
    return (
      <Container style={{ textAlign: 'center' }}>
        <MakeComment
          handleSubmit={this.handleSubmit}
          errorAlert={this.state.errorAlert}
        />
        {
          this.state.comments ?
            this.state.comments.map(comment => (
              <Comment
                key={comment.id}
                {...this.props}
                comment={comment}
                deleteComment={this.deleteComment}
              />
            ))
            : ''
        }
      </Container>
    );
  }
}

