// COMPONENTS
import React from 'react';
import { List, ListItem, Divider, Button, } from '@material-ui/core';
import InviteAUser from './inviteauser';
import Confirmation from '../confirmation';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  communitiesSpacing: {
    margin: '30px'
  },

  noCommunitiesSpacing: {
    marginLeft: '30px'
  }
}));

export default function Communities(props) {
  const { user, openInviteDialog, removeCommunity } = props;

  const classes = useStyles();

  return (
    <div className={classes.communitiesSpacing}>
      <h5 className="card-title">Your Communities</h5>
      <List>
        {
          user.communities.length ?
            user.communities.map(community => (
              <span key={community.id}>
                <div className="flex-between">
                  <a key={community.id} href={`/community/${community.id}`} className="flex-fill">
                    <ListItem button>
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
              </span>
            ))
            : <div className={classes.noCommunitiesSpacing}>
              <h5>None - Join or create one <a href="/joincommunity">here!</a></h5>
            </div>
        }
      </List>
    </div>

  );
}
