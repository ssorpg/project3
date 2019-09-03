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
      showEventsList: true,
      toggleButtonText: 'Create Event',
      communities: props.YourProfile.communities
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
          showEventsList: true
        });
      } else {
        this.setState({
          showEventsList: false
        });
      }
    } catch (error) {
      console.log('error;', error);
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
      setTimeout(this.getData, 1000);
      // this.getData();
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

        {this.state.showEventsList === false ? 
          <PostEvent
            handleInputChange =
              {this.handleInputChange}
            handleSubmit =
              {this.handleSubmit}
              communities = {this.state.communities}
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