// COMPONENTS
import React, { Component } from 'react';
import { Container, Paper } from '@material-ui/core';
import Event from './event';

// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';
import PostController from '../../posts/postcontroller';

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

  findUserIndex = user => {
    let userIndex;
    this.state.members.forEach( (member, index) => {
      if( member.id === user.id) { 
        userIndex = index;
      }
    })

    return userIndex;
  }

  addMember = user => {
    let updatedMembers = this.state.event.members;
    updatedMembers.push(user);

    this.setState({
      members: [...updatedMembers]
    })
  }
  //TODO is this the best way to get state to realize users have left?
  removeMember = user => {
    const userIndex = this.findUserIndex(user);
    let updatedMembers = this.state.event.members;
    updatedMembers.splice(userIndex, 1);

    this.setState({
      members: updatedMembers
    });
  }

  updateMembers = (action, user) => {
    switch(action) {
      default:
      case 'add':
        this.addMember(user);
        break;
      case 'delete':
        this.removeMember(user);
      break;
    }
  }

  handleToggleAttendence = async () => {
    if(this.state.userAttending) {
      try {
        let removedUser = await ax.delete(`/api/events/${this.state.event.id}/users`);
        this.updateMembers('delete', removedUser.data);


        this.setState({
          userAttending: false
        });
      } catch (error) {
        PageLoadError(error);
      }
    } else {
      try {
        let newMember = await ax.post('/api/events/1/users');
        this.updateMembers('add', newMember.data);

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
    );
  };
}