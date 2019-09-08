// COMPONENTS
import React, { Component } from 'react';
import { Container, Grid } from '@material-ui/core';
import PostController from '../../posts/postcontroller';
import Megatron from '../../megatron';

// FUNCTIONS
import ax from 'axios';
import FeedEvents from './feedevents';
import PageLoadError from '../../../utils/pageloaderror';

export default class Feed extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: undefined,
      bannerImage: undefined,
      bio: undefined,
      posts: undefined,
      events: undefined
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
        bannerImage: res.data.image,
        bio: res.data.bio,
        posts: res.data.posts,
        events: res.data.events
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
          subheading={this.state.bio}
          image={this.state.bannerImage ? `/images/${this.state.bannerImage}` : '/images/community.jpg'}
          imagePosition="5%"
          megaHeight='30vh'
          megaMaxHeight='320px!important'
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
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
          </Grid>
          <Grid item xs={12} sm={5}>
            {
              this.state.events ?
                <FeedEvents events={this.state.events} />
                : ''
            }
          </Grid>
        </Grid>
      </Container>
    );
  }
}
