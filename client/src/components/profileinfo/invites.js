// COMPONENTS
import React from 'react';
import { List, ListItem, Divider, Button } from '@material-ui/core';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  invitesSpacing: {
    margin: '24px',
    marginTop: 0
  },

  noInvitesSpacing: {
    marginLeft: '24px'
  }
}));

export default function Invites(props) {
  const { user, handleAcceptInvite, handleDeclineInvite } = props;

  const classes = useStyles();

  return (
    <div className={classes.invitesSpacing}>
      <h5 className="card-title">Your Community Invites</h5>
      <List>
        {
          user.invites.length ?
            user.invites.map(invite =>
              <span key={invite.id}>
                <div className="flex-between">
                  <ListItem className="flex-fill">
                    {invite.name}
                  </ListItem>
                  <>
                    <Button color="primary" onClick={() => handleAcceptInvite(invite.id)}>Accept</Button>
                    <Button color="secondary" onClick={() => handleDeclineInvite(invite.id)}>Decline</Button>
                  </>
                </div>
                <Divider />
              </span>
            )
            : <div className={classes.noInvitesSpacing}>
              <h5>None</h5>
            </div>
        }
      </List>
    </div>
  );
};
