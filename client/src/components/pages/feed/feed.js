// COMPONENTS
import React, { Component } from 'react';
import Header from '../../header';
import PostDisplay from '../../postdisplay';

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

  render() {
    return (
      <>
        <Header pageTitle={this.state.pageTitle} />
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
