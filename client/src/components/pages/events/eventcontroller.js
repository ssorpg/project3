// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Event from './event';
import Megatron from '../../megatron';

// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';
import PostController from '../../posts/postcontroller';

export default class EventController extends Component {
  constructor() {
    super();

    this.state = {
      event: undefined,
      members: undefined,
      posts: undefined,
      attending: false,
      alert: undefined
    };
  };

  async componentDidMount() {
    await this.getData();
    this.checkAttending();
  };

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

  checkAttending = () => {
    this.state.event.members.forEach(member => {
      if (member.id === this.props.YourProfile.id) {
        this.setState({ attending: true });
      }
    });
  };

  findUserIndex = user => {
    let userIndex;
    this.state.members.forEach((member, index) => {
      if (member.id === user.id) {
        userIndex = index;
      }
    });

    return userIndex;
  };

  addMember = async user => {
    this.setState({ members: [...this.state.members, user] });
  };

  // TODO is this the best way to get state to realize users have left?
  removeMember = user => {
    const userIndex = this.findUserIndex(user);
    let updatedMembers = this.state.members;
    updatedMembers.splice(userIndex, 1);

    this.setState({ members: [...updatedMembers] });
  };

  handleToggleAttendence = async () => {
    this.setState({ alert: undefined });

    const URL = `/api/events/${this.state.event.id}/users`;

    try {
      if (this.state.attending) {
        const removedUser = await ax.delete(URL);

        this.removeMember(removedUser.data);
        this.setState({ attending: false });
      }
      else {
        const newMember = await ax.post(URL);

        this.addMember(newMember.data);
        this.setState({ attending: true });
      }
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  render() {
    return (
      <Container maxWidth="lg">
        {
          this.state.event ?
            <>
              <Megatron
                heading={this.state.event.name}
                image="/images/event.jpg"
                imagePosition="0 76%"
              />
              <Event
                {...this.props}
                thisEvent={this.state.event}
                members={this.state.members}
                handleToggleAttendence={this.handleToggleAttendence}
                attending={this.state.attending}
                alert={this.state.alert}
              />
            </>
            : ''
        }
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
