// COMPONENTS
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Friend from './friend'

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

export default function FriendDisplay({ YourId, CommunityId, friends }) {
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
              friends ?
              friends.map(friend => (
                  <Grid item xs={6} sm={3} md={2}>
                    <Friend
                      YourId={YourId}
                      CommunityId={CommunityId}
                      friend={friend}
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