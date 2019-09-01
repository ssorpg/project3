// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import ProfileInfo from '../../profileinfo';
import PostController from '../../posts/postcontroller';

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
  }

  componentDidMount() {
    this.GetData();
  };

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/communities/${this.props.CommunityId}/users/${this.props.UserId}/wall`);

      this.setState({
        userData: userData.data,
        posts: userData.data.posts
      });
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  render() {
    return (
      <div>
        <Container maxWidth="lg">
          {
            this.state.userData ?
              <ProfileInfo user={this.state.userData} />
              : ''
          }
          {
            this.state.posts ?
              <PostController
                {...this.props}
                posts={this.state.posts}
                postURL={`/api/posts?CommunityId=${this.props.CommunityId}&UserId=${this.props.UserId}`}
                postTo='Wall'
              />
              : ''
          }
        </Container>
      </div>
    )
  }
}
