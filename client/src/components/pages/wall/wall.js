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
      friendProfile: undefined,
      posts: undefined,
      errorAlert: undefined
    };
  }

  componentDidMount() {
    this.GetData();
  };

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/communities/${this.props.CommunityId}/users/${this.props.FriendId}/wall`);

      this.setState({
        friendProfile: userData.data,
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
            this.state.friendProfile ?
              <ProfileInfo user={this.state.friendProfile} />
              : ''
          }
          {
            this.state.posts ?
              <PostController
                {...this.props}
                posts={this.state.posts}
                postURL={`/api/posts?CommunityId=${this.props.CommunityId}&UserId=${this.props.FriendId}`}
                postType='Wall'
              />
              : ''
          }
        </Container>
      </div>
    )
  }
}
