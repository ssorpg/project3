// COMPONENTS
import React from 'react';
import { List, ListItem, Divider, Button, } from '@material-ui/core';
import InviteAUser from './inviteauser';

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

export default function Communities(props) {
  const { user, openInviteDialog, removeCommunity } = props;

  const classes = useStyles();

  return (
    <div className="networks" style={{ margin: '30px' }}>
      <h5 className="card-title">Your Communities</h5>
      <List>
        {
          user.communities.length ?
            user.communities.map(community => (
              <>
                <div className={classes.spaceBetween}>
                  <a key={community.id} href={`/community/${community.id}`} className={classes.fillSpace}>
                    <ListItem button component="a">
                      {community.name}
                    </ListItem>
                  </a>
                  {
                    user.id === community.founderId ?
                      <>
                        <InviteAUser {...props} />
                        <Button color="primary" onClick={openInviteDialog} data-id={community.id}>Invite</Button>
                        <Button color="secondary" onClick={removeCommunity} data-isfounder={true} data-id={community.id}>Delete</Button>
                      </>
                      : <Button color="secondary" onClick={removeCommunity} data-id={community.id}>Leave</Button>
                  }
                </div>
                <Divider />
              </>
            ))
            : <div style={{ marginLeft: '30px' }}>
              <h5>None - Join or create one <a href="/joincommunity">here!</a></h5>
            </div>
        }
      </List>
    </div>

  );
}
