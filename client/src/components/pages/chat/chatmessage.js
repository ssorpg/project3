// COMPONENTS
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import findphoto from '../../../utils/extractprofileimage';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  msg: {
    wordBreak: 'break-all',
    maxWidth: '95vw'
  }
}));

export default function ChatMessage({ user, message, time }) {
  const classes = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="qtpie" src={findphoto(user)} />
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
                <p className={classes.msg}>{time + ': ' + message}</p>
              </Typography>
            </>
          }
        />
      </ListItem>
    </>
  );
}
