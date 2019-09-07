// COMPONENTS
import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Post from './post'

export default function PostDisplay(props) {
  const { posts, cantPost } = props;

  return (
    <Container maxWidth="lg">
      <main>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={4}
          className="theme-mtx3"
        >
          {
            posts.length ?
              posts.map(post => (
                <Grid key={post.id} item xs={12} md={4}>
                  <Post
                    {...props}
                    thisPost={post}
                  />
                </Grid>
              ))
              : cantPost ?
                ''
                : <h2 className="text-center">No posts here.<br />You should make one!</h2>
          }
        </Grid>
      </main>
    </Container>
  );
}