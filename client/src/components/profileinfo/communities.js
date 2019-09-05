// COMPONENTS
import React from 'react';
import { List, ListItem, Divider, Button, } from '@material-ui/core';
import InviteAUser from './inviteauser';
import Confirmation from '../confirmation';

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
                        <Button color="primary" onClick={() => openInviteDialog(community.id)}>Invite</Button>
                        <Confirmation
                          buttonText='Delete'
                          title='Delete this community?'
                          question='Clicking confirm will permanently remove the community.'
                          action={() => removeCommunity(community.id, true)}
                        />
                      </>
                      : <Confirmation
                        buttonText='Leave'
                        title='Leave this community?'
                        question='Clicking confirm will remove you from the community.'
                        action={() => removeCommunity(community.id)}
                      />
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
