// COMPONENTS
import React from 'react';
import { Grid, Container } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './post'

export default function PostDisplay(props) {
  const { posts, cantPost, hasMorePosts, getMorePosts } = props;

  console.log(posts);

  return (
    <Container maxWidth="lg">
      <main>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={4}
        >
          {
            posts.length ?
              <InfiniteScroll
                dataLength={posts.length}
                next={getMorePosts}
                hasMore={hasMorePosts}
                loader={<h4>Loading...</h4>}
                className="full-width flex-middle"
                style={{ flexWrap: 'wrap' }}
                endMessage={
                  <p className="full-width text-center theme-mtx3">
                    <b>No more posts to load.</b>
                  </p>
                }
              >
                {
                  posts.map(post => (
                    <Grid key={post.id} className="full-width">
                      <Post
                        {...props}
                        thisPost={post}
                      />
                    </Grid>
                  ))
                }
              </InfiniteScroll>
              : cantPost ?
                ''
                : <h2 className="text-center theme-mt theme-mbx2">No posts here.<br />You should make one!</h2>
          }
        </Grid>
      </main>
    </Container>
  );
}