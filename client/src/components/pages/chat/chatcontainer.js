// COMPONENTS
import React from 'react';
import { Container, List, ListItem, Typography } from '@material-ui/core';
import ChatMessage from './chatmessage';
import ChatInput from './chatinput';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    height: '60vh',
    overflow: 'auto',
    padding: '2%',
    paddingTop: '1%',
    maxWidth: '100%'
  },

  divider: {
    borderBottom: '1px solid #d4d4d4'
  },

  usersDisplay: {
    width: '8%',
    minWidth: '100px'
  },

  messageDisplay: {
    width: '90%',
    maxWidth: 'calc(100% - 100px)',
    overflow: 'auto',
    height: '90%',
    margin: 0,
    marginTop: '-10px',
    marginLeft: 'auto'
  }
}));

export default function ChatMessageContainer(props) {
  const { users, messages, handleSubmit } = props;

  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <List className={classes.usersDisplay}>
          <h3 className={classes.divider}>
            Users
          </h3>
          {
            users.map(user =>
              <ListItem>
                <Typography variant="body1" color="textSecondary" align="center">
                  {user}
                </Typography>
              </ListItem>
            )
          }
        </List>
        <List id="chat" className={classes.messageDisplay}>
          {
            messages.map((message, id) =>
              <ChatMessage
                key={id}
                user={message.user}
                text={message.text}
                time={message.time}
              />
            )
          }
        </List>
        <ChatInput handleSubmit={handleSubmit} />
      </Container>
    </>
  );
}
