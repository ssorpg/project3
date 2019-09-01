import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Megatron from '../../megatron';
import Modal from '../../modal';
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: undefined,
      errorAlert: undefined,
      dialogErrorAlert: undefined,
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const eventsData = await ax.get('/api/events/');
      console.log('eventsdata', eventsData);
    } catch (error) {
      console.log('ereorer;', error.message);
    }
  }

  postToDB = async () => {
    //do it
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Megatron
          heading="Events"
          megaHeight='20vh'
          megaMaxHeight='320px!important'
        />
        {this.state.events === undefined ? 
          <h1>Show form to update</h1>
        :
          <h1>Show events list</h1>
        }
      </Container>
    )
  }
}