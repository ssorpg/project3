import React, { Component } from 'react';
import { Container, Paper } from '@material-ui/core';
import SingleEvent from './singleevent';
// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';
import { getFormattedTime } from '../../../utils/formatTime';
import PostController from '../../posts/postcontroller';
//TODO add map showing location of event


export default class SingleEventController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: undefined,
      communityId: this.props.urlPath.CommunityId,
      eventId: this.props.urlPath.EventId
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await ax.get(`/api/events/${this.state.communityId}/${this.state.eventId}`);
      console.log('trd',res.data.posts);

      if (res.data) {
        this.setState({
          pageTitle: 'Events',
          event: res.data,
          posts: res.data.posts
        });
      } else {
        //todo redired or something
      }
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  render() {
    return (
      <Container>
        <Paper>
          {
            this.state.event !== undefined ? 
            <SingleEvent
              event={this.state.event}
              eventMembers={this.state.eventMembers}
              posts={this.state.posts}
              getFormattedTime={getFormattedTime}
            />
          :
            ''
          }
        </Paper>
        {console.log(this.state)}
        { this.state.posts ? 
          <PostController
            {...this.props}
            posts={this.state.posts}
            postURL={`/api/posts?CommunityId=${this.state.communityId}&EventId=${this.state.eventId}`}
            postType='Event'
          />
        :
          ''
        }
      </Container>
    )
  }
}