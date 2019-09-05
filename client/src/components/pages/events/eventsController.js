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
      pageTitle: undefined,
      events: [],
      formData: {},
      showEventsList: true,
      toggleButtonText: 'Create Event',
      alert: undefined,
      communities: this.props.YourProfile.communities
    };
  };

  handleInputChange = event => {
    let formData = this.state.formData;
    formData[event.target.name] = event.target.value;

    this.setState({ formData: formData });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ alert: undefined });

    try {
      const newEvent = await ax.post(`/api/events/create`, this.state.formData);

      this.setState({
        events: [newEvent.data, ...this.state.events],
        showEventsList: true
      });
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
