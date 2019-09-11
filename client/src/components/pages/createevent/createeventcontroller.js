// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Megatron from '../../megatron';
import MakeEvent from './makeevent';

// FUNCTIONS
import ax from 'axios';

export default class CreateEventController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      formData: {},
      communities: props.YourProfile.communities,
      alert: undefined
    };
  };

  handleInputChange = event => {
    const newFormData = { ...this.state.formData };
    newFormData[event.target.id] = event.target.value;

    this.setState({ formData: newFormData });
  };

  handleCreateEventSubmit = async event => {
    event.preventDefault();
    this.setState({ alert: undefined });

    try {
      const newEvent = await ax.post('/api/events/create', this.state.formData);

      window.location = `/community/${newEvent.data.CommunityId}/events/${newEvent.data.id}`;
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Megatron
          heading='Create an Event'
          image={this.state.bannerImage ? `/images/${this.state.bannerImage}` : '/images/community.jpg'}
          megaHeight="65vh"
          megaMaxHeight='320px!important'
        />
        {
          <MakeEvent
            handleInputChange={this.handleInputChange}
            handleCreateEventSubmit={this.handleCreateEventSubmit}
            communities={this.state.communities}
            alert={this.state.alert}
          />
        }
      </Container>
    );
  };
}
