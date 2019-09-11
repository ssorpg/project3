// COMPONENTS
import React from 'react';
import { List, ListItem, Typography } from '@material-ui/core';
import FeedEvent from './feedevent';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  submoduleHeader: {
    padding: '15px',
    color: '#000'
  }
}));

export default function FeedEvents(props) {
  const { events } = props;

  const classes = useStyles();

  return (
    <>
      <header className={classes.submoduleHeader}>
        <Typography variant="h6">Events</Typography>
      </header>
      <List component="ul">
        {
          events.map(event =>
            <ListItem key={event.id}>
              <FeedEvent thisEvent={event} />
            </ListItem>
          )
        }
      </List>
    </>
  );
};
