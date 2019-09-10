// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import FriendDisplay from './frienddisplay';
import Megatron from '../../megatron';

// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

export default class FriendsController extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: undefined,
      friends: []
    };
  };

  componentDidMount() {
    this.getData();
  };

  getData = async () => {
    try {
      const res = await ax.get(`/api/communities/${this.props.CommunityId}/users`);

      this.setState({
        pageTitle: res.data.name + ' Friends',
        friends: res.data.members
      });
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  render() {
    return (
      <Container>
        <Megatron
          heading={this.state.pageTitle}
          image={this.state.bannerImage ? `/images/${this.state.bannerImage}` : '/images/community.jpg'}
          imagePosition="50%"
          megaHeight='20vh'
          megaMaxHeight='320px!important'
        />
        <FriendDisplay
          {...this.props}
          friends={this.state.friends}
        />
      </Container>
    );
  };
}
