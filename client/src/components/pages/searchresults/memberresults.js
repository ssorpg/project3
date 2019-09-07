// COMPONENTS
import React from 'react';
import { Grid, List, ListItem } from '@material-ui/core';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  inlineMembers: {
    display: 'inline-block',
    width: 'auto'
  }
}));

export default function MemberResults(props) {
  const { YourProfile, thisCommunity } = props;

  const classes = useStyles();

  return (
    <>
      {
        thisCommunity.members.length ?
          <Grid item>
            <h6>Community Members:</h6>
            <List className="list-unstyled">
              {
                thisCommunity.members.map(member => (
                  <ListItem key={member.id} className={classes.inlineMembers}>
                    <a
                      href={
                        YourProfile.id === member.id ?
                          '/profile'
                          : `/community/${thisCommunity.id}/friends/${member.id}`
                      }
                    >
                      {member.name}
                    </a>
                  </ListItem>
                ))
              }
            </List>
          </Grid>
          : ''
      }
    </>
  );
}
