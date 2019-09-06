// COMPONENTS
import React from 'react';
// FUNCTIONS
import { List, ListItem, Buttons  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  resetListStyle: {
    listStyle: 'none'
  }
});

export default function EventsList(props) {
  const { CommunityId, getFormattedTime, events } = props;

  const classes = useStyles();

  return (
    // TODO page isnt being used?
    <List className={classes.resetListStyle}>
    <H1>THIS PAGE IS USED!</H1>
      {
        props.events === undefined ? '' : (
          props.events.map(event => (
            <ListItem key={event.id} divider="true">
              <h5>
                <a href={`/community/${event.CommunityId}/events/${event.id}`}>
                  {event.name}
                </a>
              </h5>
              <dl>
                <dd>{event.description}</dd>
                <dd><strong>Date: </strong>{event.date}</dd>
                <dd><strong>Start Time: </strong>{getFormattedTime(event.start_time)}</dd>
                <dd><strong>End Time: </strong>{getFormattedTime(event.end_time)}</dd>
              </dl>
              <ul className={classes.resetListStyle}>
                <li>
                  <Button color="primary">Attend</Button>
                  <Button variant="outline" color="secondary">Delete</Button>
                </li>
              </ul>
            </ListItem>
          ))
        )
      }
    </List>
  );
};
