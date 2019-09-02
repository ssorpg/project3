// COMPONENTS
import React from 'react';
import { Container, List } from '@material-ui/core';
import ChatMessage from './chatmessage';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 0 auto',
    height: '60vh',
    overflow: 'auto',
    padding: '50px',
    maxWidth: '90%'
  }
}));

export default function ChatMessageContainer(props) {
  const { messages } = props;
  const classes = useStyles();

  return (
    <Container id="chat" className={classes.root}>
      <List>
        {
          messages.map((message, id) =>
            <ChatMessage
              key={id}
              user={message.user}
              text={message.text}
              time={message.time}
            />,
          )
        }
      </List>
    </Container>
  );
}
