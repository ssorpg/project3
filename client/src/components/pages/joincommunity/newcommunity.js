// COMPONENTS
import React from 'react';
import { Paper, FormGroup, InputLabel, Input, Button, Typography, Checkbox, FormControlLabel } from '@material-ui/core';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '24px'
  },

  button: {
    display: 'inline-block',
    verticalAlign: 'center',
    margin: theme.spacing(1.5)
  },

  input: {
    marginBottom: theme.spacing(2)
  }
}));

export default function NewCommunity({ handleCreateCommunitySubmit, handleFormChange, makePrivate, handleMakePrivate }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleCreateCommunitySubmit}>
        <FormGroup>
          <InputLabel>
            <Typography variant="h5" gutterBottom>
              Enter Your Community Name
            </Typography>
          </InputLabel>
          <Input
            className={classes.input}
            type="text"
            name="community"
            placeholder="Awesome Community"
          />
          <FormControlLabel
            control={<Checkbox checked={makePrivate} onChange={handleMakePrivate} />}
            label="Make Private"
          />
        </FormGroup>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={handleFormChange}
        >
          Or Choose An Existing One!
        </Button>
      </form>
    </Paper>
  );
}