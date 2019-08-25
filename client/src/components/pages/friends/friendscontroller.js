// COMPONENTS
import React, { Component } from 'react';
import Header from '../../header';
import Friends from './friends';
import Megatron from '../../megatron';
import { Container } from '@material-ui/core';

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
        {/* <Header pageTitle={this.state.pageTitle} /> */}
        <Container>
          <Megatron
            heading={this.state.pageTitle}
            image="https://source.unsplash.com/random"
            imagePosition="50%"
            megaHeight='20vh'
            megaMaxHeight='320px!important'
          />
          <Friends {...this.props} friends={this.state.friends} />
        </Container>
      </>
    );
  }
}