// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Megatron from '../../megatron';
import MakeEvent from './makeevent';
import EventsList from './events';
// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

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

  componentDidMount() {
    this.getData();
  };

  getData = async () => {
    try {
      const res = await ax.get(`/api/events`);

      if (res.data) {
        this.setState({
          pageTitle: 'Events',
          events: res.data,
          showEventsList: true,
          toggleButtonText: 'Create Event',
        });
      }
      else {
        this.setState({
          pageTitle: 'Events',
          showEventsList: false,
          toggleButtonText: 'Create Event'
        });
      }
    }
    catch (error) {
      PageLoadError(error);
    }
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

  toggleDisplay = () => {
    if (this.state.showEventsList) {
      this.setState({
        showEventsList: false,
        toggleButtonText: 'Create Event'
      });
    }
    else {
      this.setState({
        showEventsList: true,
        toggleButtonText: 'Show Events'
      });
    }
  };

  getFormattedTime = militaryTime => {
    if (!militaryTime) {
      return;
    }

    const hours24 = parseInt(militaryTime.substring(0, 2));
    const hours = ((hours24 + 11) % 12) + 1;
    const amPm = hours24 > 11 ? 'pm' : 'am';
    const minutes = militaryTime.substring(2);

    return hours + minutes + amPm;
  };

  getFormattedDate = unformattedDate => {
    const date = new Date(unformattedDate);

    return date.toLocaleString('default', { month: 'long' });
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
        <nav>
          <button onClick={this.toggleDisplay}>
            {this.state.toggleButtonText}
          </button>
        </nav>
        {
          this.state.showEventsList === false ?
            <MakeEvent
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              alert={this.state.alert}
              communities={this.state.communities}
            />
            :
            <EventsList
              {...this.props}
              getFormattedTime={this.getFormattedTime}
              events={this.state.events}
            />
        }
      </Container>
    );
  };
}
