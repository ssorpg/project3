// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Megatron from '../../megatron';
import MakeEvent from './makeevent';
// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';
import { getFormattedTime } from '../../../utils/formatTime';

export default class EventsController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: 'Create an Event',
      events: [],
      formData: {},
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
        throw 'There was an unexepcted error. Please try again.'
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
        <Megatron
          heading={this.state.pageTitle}
          image="https://source.unsplash.com/random"
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
