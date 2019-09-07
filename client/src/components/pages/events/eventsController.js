// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Megatron from '../../megatron';
import MakeEvent from './makeevent';
// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

export default class EventsController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: 'Create an Event',
      events: [],
      eventData: {},
      showEventsList: true,
      toggleButtonText: 'Create Event',
      alert: undefined,
      communities: this.props.YourProfile.communities
    };
  };

  handleInputChange = event => {
    let newFormData = {...this.state.formData};
    newFormData[event.target.id] = event.target.value;

    this.setState({ formData: newFormData });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ alert: undefined });

    try {
      const newEvent = await ax.post(`/api/events/create`, this.state.formData);

      if( newEvent.status === 200) {
        window.location = `/community/${newEvent.data.CommunityId}/events/${newEvent.data.id}`;
      } else {
        throw new Error('There was an unexepcted error. Please try again.');
      }
    }
    catch (error) {
      this.setState({ alert: error.response.data });
      PageLoadError(error);
    }
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Megatron
          heading={this.state.pageTitle}
          image={this.state.bannerImage ? `/images/${this.state.bannerImage}` : '/images/community.jpg'}
          megaHeight='20vh'
          megaMaxHeight='320px!important'
        />
        {
          <MakeEvent
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            alert={this.state.alert}
            communities={this.state.communities}
          />
        }
      </Container>
    );
  };
}
