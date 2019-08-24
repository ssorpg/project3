// COMPONENTS
import React, { Component } from 'react';
import Header from '../../header';
import PostDisplay from '../../postdisplay';
import MakePost from '../../makepost';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class Feed extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: undefined,
      posts: undefined,
      errorAlert: undefined
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await ax.get(`/api/communities/${this.props.CommunityId}`);

      this.setState({
        pageTitle: res.data.name,
        posts: res.data.feedPosts
      });
    }
    catch (error) {
      CheckError(error);
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('textarea')[0];
    const message = input.value;

    const post = {
      message: message
    };

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.postToDB(post);
    submit.style.visibility = 'visible';
  }

  postToDB = async data => {
    this.setState({ errorAlert: undefined });

    try {
      const res = await ax.post(`/api/posts?CommunityId=${this.props.CommunityId}`, data);

      this.setState({
        posts: [res.data, ...this.state.posts]
      });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  vote = async event => {
    event.preventDefault();
    const postInfo = event.target.dataset.id ?
      event.target
      : event.target.parentNode;

    try {
      const res = await ax.put(`/api/posts/${postInfo.dataset.id}/${postInfo.dataset.vote}`);

      this.state.posts.forEach((post, id) => {
        if (post.id === res.data.id) {
          const newPostsScore = this.state.posts;
          newPostsScore[id].score = res.data.score;

          this.setState({
            posts: newPostsScore
          });
        }
      });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  deletePost = async event => {
    event.preventDefault();
    const postInfo = event.target.dataset.id ?
      event.target
      : event.target.parentNode;

    try {
      const res = await ax.delete(`/api/posts/${postInfo.dataset.id}`);

      this.state.posts.forEach((post, id) => {
        if (post.id === res.data.id) {
          const newRemovedPosts = this.state.posts;
          newRemovedPosts.splice(id, 1);

          console.log(newRemovedPosts);

          this.setState({
            posts: newRemovedPosts
          });
        }
      });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <>
        <Header pageTitle={this.state.pageTitle} />
        <MakePost handleSubmit={this.handleSubmit} errorAlert={this.state.errorAlert} postTo={'Feed'} />
        <PostDisplay
          {...this.props}
          posts={this.state.posts}
          vote={this.vote}
          deletePost={this.deletePost}
        />
      </>
    );
  }
}
