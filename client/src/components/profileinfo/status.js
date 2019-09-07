// COMPONENTS
import React from 'react';
import { Input, InputLabel, InputAdornment, FormControl } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  statusForm: {
    margin: '10px',
    marginBottom :'20px'
  }
}));

export default function Status(props) {
  const { handleStatusSubmit } = props;

  const classes = useStyles();

  return (
    <form onSubmit={handleStatusSubmit} className={classes.statusForm}>
      <FormControl className="full-width">
        <InputLabel htmlFor="input-with-icon-adornment">How are you feeling?</InputLabel>
        <Input
          name="status"
          id="input-with-icon-adornment"
          // autoFocus
          required
          fullWidth
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
