// COMPONENTS
import React, { Component } from 'react';
import ProfileInfo from '../../profileinfo';
import PostDisplay from '../../postdisplay';
import { Container } from '@material-ui/core';
import Megatron from '../../megatron';
import Modal from '../../modal';

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
  
  deleteCommunity = async event => {
    event.preventDefault();
    this.setState({ errorAlert: undefined });

    const commInfo = event.target.dataset.id ?
      event.target
      : event.target.parentNode;

    try {
      const res = await ax.delete(`/api/communities/${commInfo.dataset.id}`);

      this.state.userData.data.communities.forEach((comm, id) => {
        if (comm.id === res.data.id) {
          const newUserData = this.state.userData;
          newUserData.data.communities.splice(id, 1);

          console.log(newUserData);

          this.setState({
            userData: newUserData
          });
        }
      });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  leaveCommunity = async event => {
    event.preventDefault();
    this.setState({ errorAlert: undefined });

    const commInfo = event.target.dataset.id ?
      event.target
      : event.target.parentNode;

    try {
      const res = await ax.delete(`/api/communities/${commInfo.dataset.id}/users`);

      this.state.userData.data.communities.forEach((comm, id) => {
        if (comm.id === res.data.id) {
          const newUserData = this.state.userData;
          newUserData.data.communities.splice(id, 1);

          console.log(newUserData);

          this.setState({
            userData: newUserData
          });
        }
      });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  vote = async event => {
    event.preventDefault();
    this.setState({ errorAlert: undefined });

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
    this.setState({ errorAlert: undefined });

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
        <Megatron
          heading="Profile"
          image="https://source.unsplash.com/random"
          imagePosition="50%"
          megaHeight='20vh'
          megaMaxHeight='320px!important'
        />
        {/* <Paper > */} {/* makes the footer margin bug out but can always add back if needed */}
        {
          this.state.userData ?
            <ProfileInfo user={this.state.userData.data} deleteCommunity={this.deleteCommunity} leaveCommunity={this.leaveCommunity} />
            : ''
        }
        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
            : ''
        }
        {
          this.state.posts ?
            <PostDisplay {...this.props} posts={this.state.posts} cantPost={true} vote={this.vote} deletePost={this.deletePost} />
            : ''
        }
        {/* </Paper> */}
      </Container>
    )
  }
}
