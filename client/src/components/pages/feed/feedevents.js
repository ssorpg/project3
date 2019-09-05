import React, { Fragment } from 'react';
import { Container, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function FeedEvents(props) {
  console.log(props.events);
  return(
    <Fragment>
      <header>
        <h5>Events</h5>
      </header>
      <ul>
      {/* //TODO MATERIALZE */}
        {props.events.map(event => (
          <li>
            {/* //todo maybe we show event in a popover box? */}
            <a href={`/community/${event.CommunityId}/events/${event.id}`}>
            {event.name}
            </a>
            <dl>
              <dt>Time: </dt>
              <dd>{event.date}</dd>
              <dd>{event.start_time}</dd>
              <dd>{event.end_time}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}