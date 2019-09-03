// COMPONENTS
import React from 'react';
import { Input, InputLabel, InputAdornment, FormControl } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
// import ax from 'axios';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Status(props) {
  const { handleStatusSubmit } = props;

  const classes = useStyles();

  return (
    <form onSubmit={handleStatusSubmit} className={classes.margin}>
      <FormControl>
        <InputLabel htmlFor="input-with-icon-adornment">How are you feeling?</InputLabel>
        <Input
          name="status"
          id="input-with-icon-adornment"
          // autoFocus
          required
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};
