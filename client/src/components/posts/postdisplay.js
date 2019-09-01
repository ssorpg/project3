// COMPONENTS
import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Post from './post'

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  },

  noPostsHere: {
    textAlign: 'center'
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

export default function PostDisplay(props) {
  const { posts, cantPost } = props;
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
          {
            posts.length ?
              posts.map(post => (
                <Grid item xs={12} md={4}>
                  <Post
                    key={post.id}
                    {...props}
                    thisPost={post}
                  />
                </Grid>
              ))
              : cantPost ?
                ''
                : <h2 className={classes.noPostsHere}>No posts here.<br />You should make one!</h2>
          }
        </Grid>
      </main>
    </Container>
  );
}