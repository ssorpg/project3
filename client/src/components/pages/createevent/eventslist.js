// COMPONENTS
import React from 'react';
import { List, ListItem, Button } from '@material-ui/core';

// FUNCTIONS
import { GetFormattedTime } from '../../../utils/formatTime';

export default function EventsList(props) {
  const { events } = props;

  return (
    // TODO page isnt being used?
    <List className="reset-list">
      <H1>THIS PAGE IS USED!</H1>
      {
        events ?
          events.map(event => (
            <ListItem key={event.id} divider="true">
              <h5>
                <a href={`/community/${event.CommunityId}/events/${event.id}`}>
                  {event.name}
                </a>
              </h5>
              <dl>
                <dd>{event.description}</dd>
                <dd><strong>Date: </strong>{event.date}</dd>
                <dd><strong>Start Time: </strong>{GetFormattedTime(event.start_time)}</dd>
                <dd><strong>End Time: </strong>{GetFormattedTime(event.end_time)}</dd>
              </dl>
              <ul className="reset-list">
                <li>
                  <Button color="primary">Attend</Button>
                  <Button variant="outline" color="secondary">Delete</Button>
                </li>
              </ul>
            </ListItem>
          ))
          : ''
      }
    </List>
  );
};
