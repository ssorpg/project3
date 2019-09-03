// COMPONENTS
import React from 'react';

// FUNCTIONS
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
    <ul className={classes.resetListStyle}>
      {
        events.map(event => (
          <li key={event.id}>
            <h5>
              <a href={`/community/${CommunityId}/events/${event.id}`}>
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
                <button>Attend</button>
                <button>Delete</button>
              </li>
            </ul>
          </li>
        ))
      }
    </ul>
  );
};
