// COMPONENTS
import React, { Component } from 'react';
import Header from '../../header';
import FriendDisplay from './frienddisplay';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class Friends extends Component {
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
        <FriendDisplay
          {...this.props}
          friends={this.state.friends}
        />
      </>
    );
  }
}