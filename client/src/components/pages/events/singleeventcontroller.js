import React, { Component } from 'react';
import { Container, Paper, Grid } from '@material-ui/core';
import Megatron from '../../megatron';
import EventsList from './events';
// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';
import { getFormattedTime } from '../../../utils/formatTime';

export default class SingleEventController extends Component {
  constructor(props) {
    super(props);
    console.log('propdsid/;m', props);
    this.state = {
      events: [1,2,3,4]
    }
  }

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