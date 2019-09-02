// COMPONENTS
import React from 'react';
import { List, ListItem, Divider, Button } from '@material-ui/core';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  fillSpace: {
    flex: 1
  }
}));

export default function Invites(props) {
  const { user, handleAcceptInvite, handleDeclineInvite } = props;

  const classes = useStyles();

  return (
    <div className="invites" style={{ margin: '30px', marginTop: 0 }}>
      <h5 className="card-title">Your Community Invites</h5>
      <List>
        {
          user.invites.length ?
            user.invites.map(invite => (
              <>
                <div className={classes.spaceBetween}>
                  <ListItem className={classes.fillSpace}>
                    {invite.name}
                  </ListItem>
                  <>
                    <Button color="primary" onClick={handleAcceptInvite} data-id={invite.id}>Accept</Button>
                    <Button color="secondary" onClick={handleDeclineInvite} data-id={invite.id}>Decline</Button>
                  </>
                </div>
                <Divider />
              </>
            ))
            : <div style={{ marginLeft: '30px' }}>
              <h5>None</h5>
            </div>
        }
      </List>
    </div>
  );
};