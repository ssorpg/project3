import React from 'react';
import {
  Card, List, ListItem,
  CardHeader, CardContent,
  CardActions, Collapse,
  Avatar, IconButton, Typography,
  CardMedia, Divider, Button,
  Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InviteAUser from './inviteauser';
import Status from './status';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExtractProfileImage from '../utils/extractprofileimage';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 'auto',
    //marginTop: '20px'
  },

  card2: {
    maxWidth: '500px',
    marginTop: '20px'
  },

  profile: {
    marginTop: '20px'
  },

  media: {
    height: 0,
    paddingTop: '100%'
  },

  expand: {
    transform: 'rotate(0deg)',
    marginRight: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },

  expandOpen: {
    transform: 'rotate(180deg)'
  },

  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  fillSpace: {
    flex: 1
  },

  avatar: {
    backgroundColor: '#3f51b5',
    backgroundImage: 'url(https://i.ibb.co/6WVS2GB/tpn2.png)'
  }
}));

export default function ProfileInfo(props) {
  const { user, openInviteDialog, removeCommunity, handleInvite } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <>
      {
        user ?
          <Card className={classes.card}>
            <Grid container>
              <Grid item md={6}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="friend" className={classes.avatar}>
                    </Avatar>
                  }
                  title={<h3>{user.name}</h3>}
                  subheader={<><i>{user.location}</i> <br />
                    Status: <i>{user.status}</i></>}
                />
                <Card className={classes.card2}>
                  <CardMedia
                    className={classes.media}
                    image={ExtractProfileImage(user)}
                    title="Profile"
                  />
                </Card>
                <Status user={user} />
                {/* <Typography paragraph>
                  <strong>Status:</strong> {user.status ? user.status : 'This user has no status yet.'}
                </Typography> */}
              </Grid>
              <Grid item md={6}>
                {/* <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit> */}
                <CardContent className={classes.profile}>
                  <Typography paragraph><h4>Profile</h4></Typography>
                  <Typography paragraph>
                    <strong>Bio:</strong> {user.bio ? user.bio : 'This user has no bio yet.'}
                  </Typography>
                  <Typography paragraph>
                    <strong>Location:</strong> {user.location ? user.location : 'Unknown'}
                  </Typography>
                </CardContent>
                {/* </Collapse> */}
              </Grid>
            </Grid>
            {
              user.communities ?
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
                        : <div className="networks" style={{ marginLeft: '30px' }}>
                          <h5>None - Join or create one <a href="/joincommunity">here!</a></h5>
                        </div>
                    }
                  </List>
                </div>
                : ''
            }
            {
              user.invites && user.invites.length ?
                <div className="invites" style={{ margin: '30px', marginTop: 0 }}>
                  <h5 className="card-title">Your Community Invites</h5>
                  <List>
                    {
                      user.invites.map(invite => (
                        <>
                          <div className={classes.spaceBetween}>
                            <ListItem className={classes.fillSpace}>
                              {invite.name}
                            </ListItem>
                            <>
                              <Button color="primary" onClick={handleInvite} data-action={'accept'} data-id={invite.id}>Accept</Button>
                              <Button color="secondary" onClick={handleInvite} data-action={'decline'} data-id={invite.id}>Decline</Button>
                            </>
                          </div>
                          <Divider />
                        </>
                      ))
                    }
                  </List>
                </div>
                : ''
            }
          </Card>
          : ''
      }
    </>
  );
}
