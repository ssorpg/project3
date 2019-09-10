// COMPONENTS
import React from 'react';
import { List, ListItem, Typography } from '@material-ui/core';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  submoduleHeader: {
    backgroundColor: '#3f51b5',
    padding: '15px',
    color: '#fdfdfd',
    textShadow: '0 0 3px #3f3f3f'
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
            <ListItem divider={true} key={event.id}>
              {/* //todo maybe we show event in a popover box? */}
              <List component='dl'>
                <ListItem component="dt" disableGutters={true}>
                  <a href={`/community/${event.CommunityId}/events/${event.id}`}>
                    {event.name}
                  </a>
                </ListItem>
                <ListItem component="dd" disableGutters={true}>
                  {event.date} : {event.start_time} - {event.end_time}
                </ListItem>
              </List>
            </ListItem>
          )
        }
      </List>
    </>
  );
};
