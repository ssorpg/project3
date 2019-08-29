
// COMPONENTS
import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import Modal from '../modal';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(1),
    width: '100%'
  },

  submit: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3)
  }
}));

export default function MakeComment({ handleSubmit, errorAlert }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.mainGrid}
    >
      <form className="form-group" onSubmit={handleSubmit}>
        <TextField
          label="Leave a comment"
          placeholder='Leave a comment'
          // multiline
          fullWidth
          required
          variant="outlined"
        />
        <Button type="submit" value="submit" variant="contained" color="primary" className={classes.submit}>
          Comment
        </Button>
        {
          errorAlert ?
            <Modal error={errorAlert} />
            : ''
        }
      </form>
    </Grid>
  );
}