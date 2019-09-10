// COMPONENTS
import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import Modal from '../modal';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  makeCommentTopSpacing: {
    marginTop: '12px'
  }
}));

export default function MakeComment(props) {
  const { handleSubmit, alert } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.makeCommentTopSpacing}
    >
      <form className="form-group" onSubmit={handleSubmit}>
        <TextField
          label="Leave a comment"
          // multiline
          fullWidth
          required
          variant="outlined"
        />
        <Button type="submit" value="submit" variant="contained" color="primary" className="theme-mt">
          Comment
        </Button>
        {
          alert ?
            <Modal error={alert} />
            : ''
        }
      </form>
    </Grid>
  );
};
