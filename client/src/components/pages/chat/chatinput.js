// COMPONENTS
import React from 'react';
import { Container, TextField } from '@material-ui/core';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toBottom: {
    flexShrink: 0
  }
}));

export default function ChatInput({ handleSubmit }) {
  const classes = useStyles();

  return (
    <Container className={classes.toBottom}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Chat with your community!"
          placeholder="Enter message..."
          // multiline // kinda breaks post to db
          fullWidth
          required
          margin="normal"
          variant="outlined"
        />
        {/* <Button type="submit" value={'Send'} variant="contained" color="primary">
            Send
        <Icon>send</Icon>
          </Button> */}
      </form>
    </Container>
  )
}
