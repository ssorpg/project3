import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Card, List, ListItem,
  CardHeader, CardContent,
  CardActions, Collapse,
  Avatar, IconButton, Typography,
  CardMedia, Divider
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import GetProfileImage from '../utils/getprofileimage';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 'auto',
    marginTop: '20px'
  },

  card2: {
    maxWidth: '500px',
    marginTop: '20px'
  },

  media: {
    height: 0,
    paddingTop: '100%'
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
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
  },
}));

export default function ProfileInfo({ user, deleteCommunity, leaveCommunity }) {
  console.log(user);
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
            <CardHeader
              avatar={
                <Avatar aria-label="friend" className={classes.avatar}>
                </Avatar>
              }
              title={<h3>{user.name}</h3>}
              subheader={<i>{user.location}</i>}
            />
            <Card className={classes.card2}>
              <CardMedia
                className={classes.media}
                image={GetProfileImage(user)}
                title="Profile"
              />
            </Card>
            <CardActions disableSpacing>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph><h4>Profile</h4></Typography>
                <Typography paragraph>
                  <strong>Bio:</strong> {user.bio}
                </Typography>
                <Typography paragraph>
                  <strong>Location:</strong> {user.location}
                </Typography>
              </CardContent>
            </Collapse>
            {
              user.communities ?
                <div className="networks" style={{ margin: '30px' }}>
                  <h5 className="card-title">Your Networks</h5>
                  <List>
                    {
                      user.communities.map(community => (
                        <>
                          <div className={classes.spaceBetween}>
                            <a className={classes.fillSpace} key={community.id} href={`/community/${community.id}`} >
                              <ListItem button component="a">
                                {community.name}
                              </ListItem>
                            </a>
                            {
                              user.id === community.founderId ?
                                <Button color="secondary" onClick={deleteCommunity} data-id={community.id}>Delete Community</Button>
                                : <Button color="secondary" onClick={leaveCommunity} data-id={community.id}>Leave Community</Button>
                            }
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
