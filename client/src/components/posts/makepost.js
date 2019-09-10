// COMPONENTS
import React from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import Modal from '../modal';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  makePostForm: {
    maxWidth: '350px'
  },

  makePostTextarea: {
    width: '92vw',
    maxWidth: '350px',
    height: '100px',
    padding: '3px',
    resize: 'none'
  }
}));

export default function MakePost(props) {
  const { handleMakePost, postType, alert } = props;

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <main>
        <Grid
          container
          direction="row"
          className="flex-middle theme-mbx2"
        >
          <form className={classes.makePostForm + " flex-col flex-middle"} onSubmit={handleMakePost}>
            <textarea type="text" name="feed-comment" placeholder="What's on your mind?" className={classes.makePostTextarea} />
            <Button type="submit" value="submit" variant="contained" color="primary" className="theme-mt">
              {postType ? `Post To ${postType}` : 'Post'}
            </Button>
            {
              alert ?
                <Modal error={alert} className="theme-mt" />
                : ''
            }
          </form>
        </Grid>
      </main>
    </Container>
  );
};
