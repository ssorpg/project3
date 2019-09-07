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
      //cutting out future events because sequelize wont allow limiting an included model
      //TODO make this better
      let events = undefined;

      if(res.data.events && res.data.events.length > 3) {
        events = res.data.events.slice(0,3);
      } else if(res.data.events) {
        events = res.data.events;
      }
      
      this.setState({
        pageTitle: res.data.name + ' Feed',
        bannerImage: res.data.image,
        bio: res.data.bio,
        posts: res.data.posts,
        events: events
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
            
            {
              this.state.events ?
              <Grid item xs={12} sm={5}>
                <FeedEvents events={this.state.events} />
              </Grid>
            :
                ''
            }
          </Grid>
        </Container>
      </>
    );
  }
}
