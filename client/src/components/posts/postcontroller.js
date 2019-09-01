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

  handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('textarea')[0];

    const post = {
      message: input.value
    };

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.postToDB(form, post);
    submit.style.visibility = 'visible';
  };

  postToDB = async (form, post) => {
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

  vote = async event => {
    this.setState({ alert: undefined });

    const postInfo = event.target.dataset.id ?
      event.target.dataset
      : event.target.parentNode.dataset;

    try {
      const res = await ax.put(`/api/posts/${postInfo.id}/${postInfo.vote}`);

      const newPostsScore = this.state.posts.map(post => {
        if (post.id === res.data.id) {
          post.score = res.data.score;
        }
        return post;
      });

      this.setState({ posts: newPostsScore });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  deletePost = async event => {
    this.setState({ alert: undefined });

    const postInfo = event.target.dataset.id ?
      event.target.dataset
      : event.target.parentNode.dataset;

    try {
      const res = await ax.delete(`/api/posts/${postInfo.id}`);

      const newRemovedPosts = this.state.posts.filter(post => { return post.id !== res.data.id; });
      this.setState({ posts: newRemovedPosts });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  render() {
    return (
      <>
        {
          !this.props.cantPost ?
            <MakePost
              handleSubmit={this.handleSubmit}
              alert={this.state.alert}
              postType={this.state.postType}
            />
            : ''
        }
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