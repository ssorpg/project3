// COMPONENTS
import React, { Component } from 'react';
import Header from '../../header';
import Friends from './friends';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class FriendsController extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: undefined,
      friends: undefined
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await ax.get(`/api/communities/${this.props.CommunityId}/users`);

      this.setState({
        pageTitle: res.data.name + ' Friends',
        friends: res.data.members
      });
    }
    catch (error) {
      CheckError(error);
    }
  }

  render() {
    return (
      <>
        <Header pageTitle={this.state.pageTitle} />
        <Friends {...this.props} friends={this.state.friends} />
      </>
    );
  }
}