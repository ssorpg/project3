import React, { Component } from 'react';
import { Container } from '@material-ui/core';

export default class EventsList extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <ul>
        {this.props.events.map(event => (
          <li key={event.id}>
            <h5>
              <a href={`/events/${event.id}`}>
                {event.name}
              </a>
            </h5>
            <h6>{event.description}</h6>
            <dl>
              <dt>Date:</dt>
              <dd>{event.date}</dd>
              <dt>Start Time:</dt>
              <dd>{event.start_time}</dd>
              <dt>End Time:</dt>
              <dd>{event.end_time}</dd>
              <dt>In Community:</dt>
              <dd>{event.Community.name}</dd>
            </dl>
            <ul>
              <li>
                <button>Attend</button>
                <button>Delete</button>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}