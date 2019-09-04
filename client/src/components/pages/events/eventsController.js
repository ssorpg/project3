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
  constructor() {
    super();

    this.state = {
      pageTitle: undefined,
      bannerImage: undefined,
      events: [],
      formData: {},
      showEventsList: true,
      toggleButtonText: 'Create Event',
      alert: undefined
    };
  };

  componentDidMount() {
    this.getData();
  };

  getData = async () => {
    try {
      const res = await ax.get(`/api/communities/${this.props.CommunityId}/events`);

      if (res.data.events.length) {
        this.setState({
          pageTitle: res.data.name + ' Events',
          bannerImage: res.data.bannerImage,
          events: res.data.events,
          showEventsList: true,
          toggleButtonText: 'Show Events'
        });
      }
      else {
        this.setState({
          pageTitle: res.data.name + ' Events',
          bannerImage: res.data.bannerImage,
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
      const newEvent = await ax.post(`/api/communities/${this.props.CommunityId}/events`, this.state.formData);

      this.setState({ events: [newEvent.data, ...this.state.events] });
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
          image={this.state.bannerImage ? `/images/${this.state.bannerImage}` : '/images/community.jpg'}
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
