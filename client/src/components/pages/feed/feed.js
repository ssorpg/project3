// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import PostController from '../../posts/postcontroller';
import Megatron from '../../megatron';

// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

export default class Feed extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: undefined,
      bio: undefined,
      posts: undefined
    };
  };

  componentDidMount() {
    this.getData();
  };

  getData = async () => {
    try {
      const res = await ax.get(`/api/communities/${this.props.CommunityId}`);

      this.setState({
        pageTitle: res.data.name + ' Feed',
        bio: res.data.bio,
        posts: res.data.posts
      });
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  render() {
    return (
      <>
        <Container>
          <Megatron
            heading={this.state.pageTitle}
            subheading={this.state.bio}
            image="https://source.unsplash.com/random"
            imagePosition="5%"
            megaHeight='30vh'
            megaMaxHeight='320px!important'
          />
        </Container>
        {
          this.state.posts ?
            <PostController
              {...this.props}
              posts={this.state.posts}
              postURL={`/api/posts?CommunityId=${this.props.CommunityId}`}
              postType='Feed'
            />
            : ''
        }
      </>
    );
  }
}
