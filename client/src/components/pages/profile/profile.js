// COMPONENTS
import React, { Component } from 'react';
import Card from '../../card.js';
import ProfileInfo from '../../profileinfo';
import PostDisplay from '../../postdisplay';
import { Paper, Container } from '@material-ui/core';
// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      posts: undefined,
      errorAlert: undefined
    };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/users/profile/`);

      this.setState({
        userData: userData,
        posts: userData.data.wallPosts
      });
    }
    catch (error) {
      CheckError(error);
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
      <Container maxWidth="lg">
        <Paper >
          {/* <Card className="text-dark text-left col-12 card" style={{ border: 'none' }}> */}
<<<<<<< HEAD
          <ProfileInfo
            userData={this.state.userData}
          />
          {
            this.state.posts ?
              <PostDisplay
                posts={this.state.posts}
                cantPost={true}
              />
=======
          {
            this.state.userData ?
              <ProfileInfo user={this.state.userData.data} />
              : ''
          }
          {
            this.state.posts ?
              <PostDisplay {...this.props} posts={this.state.posts} cantPost={true} vote={this.vote} deletePost={this.deletePost} />
>>>>>>> 9348fabbe3b8b8be5c06b5a91dca7838732da046
              : ''
          }
          {/* </Card> */}
        </Paper>
      </Container>
    )
  }
}
