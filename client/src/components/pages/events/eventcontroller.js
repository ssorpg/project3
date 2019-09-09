// COMPONENTS
import React, { Component } from 'react';
import { Container, Paper } from '@material-ui/core';
import Event from './event';

// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';
import PostController from '../../posts/postcontroller';
// TODO add map showing location of event

export default class EventController extends Component {
  constructor() {
    super();

    this.state = {
      events: undefined,
      members: undefined,
      posts: undefined
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await ax.get(`/api/events/${this.props.EventId}`);

      this.setState({
        event: res.data,
        members: res.data.members,
        posts: res.data.posts
      });
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  handleAttendClick = async () => {
    try {
      let x = ax.post('/api/events/1/users');
      console.log(x);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container>
        <Paper>
          {
            this.state.event ?
              <Event
                {...this.props}
                thisEvent={this.state.event}
                members={this.state.members}
                posts={this.state.posts}
                handleAttendClick={this.handleAttendClick}
              />
              : ''
          }
        </Paper>
        {
          this.state.posts ?
            <PostController
              {...this.props}
              posts={this.state.posts}
              postURL={`/api/posts?CommunityId=${this.props.CommunityId}&EventId=${this.props.EventId}`}
              postType='Event'
            />
            : ''
        }
      </Container>
    )
  }
}