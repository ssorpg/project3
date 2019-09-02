import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Megatron from '../../megatron';
import Modal from '../../modal';
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';
import PostEvent from './postevent';
import EventsList from './events';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      errorAlert: undefined,
      dialogErrorAlert: undefined,
      fomrData: {},
      showEventsList: false,
      toggleButtonText: 'Create Event'
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const eventsData = await ax.get('/api/events/');
      
      if(eventsData.data.length !== 0) {
        this.setState({
          events: eventsData.data,
        });
      } else {
        this.setState({
          showEventsList: true
        });
      }
    } catch (error) {
      console.log('ereorer;', error.message);
    }
  }

  handleInputChange = event => {
    this.state.fomrData[event.target.name] =
      event.target.value;
  }
  
  handleSubmit = async event => {
    event.preventDefault();

    try {
      const postedEvent = await ax.post('/api/events/create', this.state.fomrData);
      console.log(postedEvent);
    } catch (error) {
      console.log('er', error.message);
    }
  }

  toggleDisplay = () => {
    if(this.state.showEventsList) {
      this.setState({
        showEventsList: false,
        toggleButtonText: 'Create Event'
      });
    } else {
      this.setState({
        showEventsList: true,
        toggleButtonText: 'Show Events'
      });
    }
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Megatron
          heading="Events"
          megaHeight='20vh'
          megaMaxHeight='320px!important'
        />
        <nav>
          <button onClick={this.toggleDisplay}>
            {this.state.toggleButtonText}
          </button>
        </nav>

        {this.state.showEventsList ? 
          <PostEvent
            handleInputChange =
              {this.handleInputChange}
            handleSubmit =
              {this.handleSubmit}
          />
        :
          <EventsList
            events = {this.state.events}
          />
        }
      </Container>
    )
  }
}