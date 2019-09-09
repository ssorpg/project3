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
      hasMorePosts: true,
      alert: undefined
    }
  };

  componentDidMount() {
    const infiniteScroll = document.getElementsByClassName('infinite-scroll-component')[0];

    if (infiniteScroll) {
      infiniteScroll.parentNode.style.maxWidth = '667px';
    }
  };

  getMorePosts = async () => {
    this.setState({ alert: undefined });

    const lastPostId = this.state.posts[this.state.posts.length - 1].id

    try {
      const res = await ax.get(this.state.postURL + `&startAt=${lastPostId}`);

      if (!res.data.length) { // hard to read - TODO reactor
        await this.setState({ hasMorePosts: false }); // use await to prevent loading more posts before previous ones have loaded
      }
      else if (res.data.length < 20) {
        await this.setState({
          hasMorePosts: false,
          posts: [...this.state.posts, ...res.data]
        });
      }
      else {
        await this.setState({ posts: [...this.state.posts, ...res.data] });
      }
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
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

      const newPosts = [...this.state.posts];

      newPosts.forEach(post => { // spread operator then forEach instead of map to prevent reloading entire array
        if (post.id === res.data.id) {
          post.score = res.data.score;
        }
      });

      this.setState({ posts: newPosts });
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
        {
          !this.state.cantPost ?
            <MakePost
              handleMakePost={this.handleMakePost}
              postType={this.state.postType}
              alert={this.state.alert}
            />
            : ''
        }
        <PostDisplay
          {...this.props}
          posts={this.state.posts}
          vote={this.vote}
          deletePost={this.deletePost}
          hasMorePosts={this.state.hasMorePosts}
          getMorePosts={this.getMorePosts}
        />
      </>
    );
  };
}