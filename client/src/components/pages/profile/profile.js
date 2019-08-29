// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import ProfileInfo from '../../profileinfo';
import PostController from '../../posts/postcontroller';
import Megatron from '../../megatron';
import Modal from '../../modal';

// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: undefined,
      posts: undefined,
      errorAlert: undefined
    };
  };

  componentDidMount() {
    this.GetData();
  };

  GetData = async () => {
    try {
      const userData = await ax.get('/api/users/profile/');

      this.setState({
        userData: userData.data,
        posts: userData.data.wallPosts
      });
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  removeCommunity = async event => {
    event.preventDefault();
    this.setState({ errorAlert: undefined });

    const commInfo = event.target.dataset.id ? // sometimes the child element receives the event
      event.target.dataset
      : event.target.parentNode.dataset;

    const URL = commInfo.isfounder ?
      `/api/communities/${commInfo.id}` // delete comm
      : `/api/communities/${commInfo.id}/users` // leave comm

    try {
      const removedComm = await ax.delete(URL);

      const newUserData = this.state.userData;
      newUserData.communities = newUserData.communities.filter(comm => { return comm.id !== removedComm.data.id; });
      this.setState({ userData: newUserData });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  };

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
        {
          this.state.userData ?
            <ProfileInfo
              user={this.state.userData}
              removeCommunity={this.removeCommunity}
            />
            : ''
        }
        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
            : ''
        }
        {
          this.state.posts ?
            <PostController
              posts={this.state.posts}
              cantPost={true}
            />
            : ''
        }
      </Container>
    );
  };
}
