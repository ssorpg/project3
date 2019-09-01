// COMPONENTS
import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Friend from './friend'

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

export default function FriendDisplay(props) {
  const { friends } = props;
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
            friends.map(friend => (
              <Grid item xs={6} sm={3} md={2}>
                <Friend
                  {...props}
                  thisFriend={friend}
                />
              </Grid>
            ))
          }
        </Grid>
      </main>
    </Container>
  );
}