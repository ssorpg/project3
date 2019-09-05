import React, { Component } from 'react';
import { Container, Paper, Grid } from '@material-ui/core';
import Megatron from '../../megatron';
import EventsList from './events';
// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';
import { getFormattedTime } from '../../../utils/formatTime';
//TODO show event invited guests and bio and as much more info as you can get on this empty page - allow commenting
//TODO MATERIALIZE
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
      
      if (res.data) {
        this.setState({
          pageTitle: 'Events',
          events: [res.data],
          showEventsList: true,
          toggleButtonText: 'Create Event',
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
          <EventsList
            events={this.state.events}
            getFormattedTime={getFormattedTime}
          />
        </Paper>
      </Container>
    )
  }
}