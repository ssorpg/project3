// COMPONENTS
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Post from './post'

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

export default function PostDisplay({ YourId, CommunityId, posts, vote, deletePost }) {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <main>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={4}
            className={classes.mainGrid}
          >
            {
              posts ?
                posts.map(post => (
                  <Grid item xs={12} md={4}>
                    <Post
                      YourId={YourId}
                      CommunityId={CommunityId}
                      post={post}
                      vote={vote}
                      deletePost={deletePost}
                    />
                  </Grid>
                ))
                : ''
            }
          </Grid>
        </main>
      </Container>
    </>
  );
}