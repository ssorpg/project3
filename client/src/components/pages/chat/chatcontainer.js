// COMPONENTS
import React from 'react';
import { Container, List, ListItem, Typography } from '@material-ui/core';
import ChatMessage from './chatmessage';
import ChatInput from './chatinput';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles'

// there's a lot going on in this css, refactor?
const useStyles = makeStyles({
  chatContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '74vh',
    padding: '1% 2%',
    maxWidth: '100%'
  },

  usersDisplay: {
    width: '12%',
    minWidth: '100px'
  },

  messageDisplay: {
    height: '90%',
    width: '88%',
    maxWidth: 'calc(100% - 100px)',
    overflow: 'auto',
    marginLeft: 'auto'
  }
});

export default function ChatContainer(props) {
  const { users, messages, handleSubmit } = props;

  const classes = useStyles();

  return (
    <Container className={classes.chatContainer}>
      <List className={classes.usersDisplay}>
        <h3 className="gray-divider">
          Users
        </h3>
        {
          users.map(user =>
            <ListItem key={user.id}>
              <Typography variant="body1" color="textSecondary" align="center">
                {user.name}
              </Typography>
            </ListItem>
          )
        }
      </List>
      <List id="chat" className={classes.messageDisplay + " reset-margin"}>
        {
          messages.map((message, index) =>
            <ChatMessage
              key={index}
              user={message.user}
              text={message.text}
              time={message.time}
            />
          )
        }
      </List>
      <ChatInput handleSubmit={handleSubmit} />
    </Container>
  );
};
