// COMPONENTS
import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import ExtractProfileImage from '../../../utils/extractprofileimage';

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline'
  },

  msg: {
    wordBreak: 'break-all',
    maxWidth: '95vw'
  },

  blackText: {
    color: '#000'
  }
}));

export default function ChatMessage({ user, text, time }) {
  const classes = useStyles();
  
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="qtpie" src={ExtractProfileImage(user)} />
      </ListItemAvatar>
      <ListItemText
        primary={user.name}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textSecondary"
            >
              <p className={classes.msg}>
              {time + ': '}<span className={classes.blackText}>{text}</span>
              </p>
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}
