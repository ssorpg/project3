// COMPONENTS
import React from 'react';
import { Grid, List, ListItem } from '@material-ui/core';

export default function MemberResults(props) {
  const { YourProfile, thisCommunity } = props;

  return (
    <>
      {
        thisCommunity.members.length ?
          <Grid item>
            <h6>Community Members:</h6>
            <List className="list-unstyled members">
              {
                thisCommunity.members.map(member => (
                  <ListItem key={member.id}>
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
