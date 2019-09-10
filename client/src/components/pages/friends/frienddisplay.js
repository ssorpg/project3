// COMPONENTS
import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Friend from './friend'

export default function FriendDisplay(props) {
  const { friends } = props;

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
            friends.map(friend =>
              <Grid key={friend.id} item xs={6} sm={3} md={2}>
                <Friend
                  {...props}
                  thisFriend={friend}
                />
              </Grid>
            )
          }
        </Grid>
      </main>
    </Container>
  );
};
