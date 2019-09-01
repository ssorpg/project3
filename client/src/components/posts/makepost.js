// COMPONENTS
import React from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import Modal from '../modal';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  },

  form: {
    padding: theme.spacing(0, 0, 3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '350px'
  },

  textarea: {
    width: '92vw',
    maxWidth: '350px',
    minHeight: '100px',
    padding: '3px',
    resize: 'none',
    verticalAlign: 'bottom'
  },

  submit: {
    marginTop: '8px'
  }
}));

export default function MakePost(props) {
  const { handleMakePost, postType, cantPost, alert } = props;

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <main>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={4}
          className={classes.mainGrid}
        >
          <form className={classes.form} onSubmit={handleMakePost}>
            {
              !cantPost ?
                <>
                  <textarea type="text" name="feed-comment" placeholder="What's on your mind?" className={classes.textarea} />
                  <Button type="submit" value="submit" variant="contained" color="primary" className={classes.submit}>
                    {postType ? `Post To ${postType}` : 'Post'}
                  </Button>
                </>
                : ''
            }
            {
              alert ?
                <Modal error={alert} />
                : ''
            }
          </form>
        </Grid>
      </main>
    </Container>
  );
}