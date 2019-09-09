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
  constructor(props) {
    super(props);
    const { YourProfile } = props;

    this.state = {
      event: undefined,
      members: undefined,
      posts: undefined,
      userAttending: false,
      userProfile: YourProfile
    }
  }

  async componentDidMount() {
    await this.getData();
    this.isEventMember();
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

  isEventMember = () => {
    this.state.event.members.forEach( member => {
      if(member.id === this.state.userProfile.id) {
        this.setState({
          userAttending: true
        });
      }
    });
  }

  handleToggleAttendence = async () => {
    if(this.state.userAttending) {
      try {
        await ax.delete(`/api/events/${this.state.event.id}/users`);
        
        this.setState({
          userAttending: false
        });
      } catch (error) {
        PageLoadError(error);
      }
    } else {
      try {
        await ax.post('/api/events/1/users');
        
        this.setState({
          userAttending: true
        });
      } catch (error) {
        PageLoadError(error);
      }
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
                handleToggleAttendence={this.handleToggleAttendence}
                attending={this.state.userAttending}
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