// COMPONENTS
import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';

// FUNCTIONS
import ExtractProfileImage from '../../../utils/extractprofileimage';

export default function ChatMessage(props) {
  const { user, text, time } = props;
  
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
              color="textSecondary"
            >
              <span className="message-wrap">
              {time + ': '}<span className="black-text">{text}</span>
              </span>
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}
