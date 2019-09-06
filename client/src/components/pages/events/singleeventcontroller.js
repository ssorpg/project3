import React, { Component } from 'react';
import { Container, Paper } from '@material-ui/core';
import SingleEvent from './singleevent';
// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';
import { getFormattedTime } from '../../../utils/formatTime';
//TODO add map showing location of event
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
      console.log(res.data);
      if (res.data) {
        this.setState({
          pageTitle: 'Events',
          event: res.data
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
              getFormattedTime={getFormattedTime}
            />
          :
            ''
          }
        </Paper>
      </Container>
    )
  }
}