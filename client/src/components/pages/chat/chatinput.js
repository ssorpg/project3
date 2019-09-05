// COMPONENTS
import React from 'react';
import { TextField } from '@material-ui/core';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formSize: {
    width: '100%',
    flexShrink: 0,
    margin: 0,
    marginTop: '-4px', // just to get it to work on mobile
    marginLeft: 'auto'
  }
}));

export default function ChatInput(props) {
  const { handleSubmit } = props;

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.formSize}>
      <TextField
        label="Chat with your community!"
        placeholder="Enter message..."
        // multiline // kinda breaks post to db
        fullWidth
        required
        variant="outlined"
      />
      {/* <Button type="submit" value={'Send'} variant="contained" color="primary">
            Send
        <Icon>send</Icon>
          </Button> */}
    </form>
  );
};
