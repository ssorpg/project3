// COMPONENTS
import React, { Component } from 'react';
import MakePost from './makepost';
import PostDisplay from './postdisplay';

// FUNCTIONS
import ax from 'axios';

export default class PostController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: props.posts,
      postURL: props.postURL,
      postType: props.postType,
      cantPost: props.cantPost,
      alert: undefined
    }
  };

  handleMakePost = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('textarea')[0];

    const post = {
      message: input.value
    };

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.makePost(form, post);
    submit.style.visibility = 'visible';
  };

  makePost = async (form, post) => {
    this.setState({ alert: undefined });

    try {
      const res = await ax.post(this.state.postURL, post);
      form.reset();
      this.setState({ posts: [res.data, ...this.state.posts] });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  vote = async (PostId, voteType) => {
    this.setState({ alert: undefined });

    try {
      const res = await ax.put(`/api/posts/${PostId}/${voteType}`);

      const newPostScore = this.state.posts.map(post => {
        if (post.id === res.data.id) {
          post.score = res.data.score;
        }
        return post;
      });

      this.setState({ posts: newPostScore });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  deletePost = async PostId => {
    this.setState({ alert: undefined });

    try {
      const res = await ax.delete(`/api/posts/${PostId}`);

      const newPosts = this.state.posts.filter(post => { return post.id !== res.data.id; });
      this.setState({ posts: newPosts });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  render() {
    return (
      <>
        <MakePost
          handleMakePost={this.handleMakePost}
          postType={this.state.postType}
          cantPost={this.state.cantPost}
          alert={this.state.alert}
        />
        <PostDisplay
          {...this.props}
          posts={this.state.posts}
          vote={this.vote}
          deletePost={this.deletePost}
        />
      </>
    );
  };
}