import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfilePhoto from './profilephoto';
import {
  Card, List, ListItem,
  CardHeader, CardContent,
  CardActions, Collapse,
  Avatar, IconButton, Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 'auto',
    marginTop: '20px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default function ProfileInfo({ userData }) {
  console.log(userData);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <>
      {
        userData ?
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="friend" className={classes.avatar}>
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={userData.data.name}
              subheader={userData.data.location}
            />
            <ProfilePhoto id={userData.data.id} />
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
                <Typography paragraph><strong>Profile</strong></Typography>
                <Typography paragraph>
                  Bio: {userData.data.bio}
                </Typography>
                <Typography paragraph>
                  Location: {userData.data.location}
                </Typography>
              </CardContent>
            </Collapse>
            {
              userData.data.communities ?
                <div className="networks" style={{ margin: '30px' }}>
                  <h5 className="card-title">Your Networks</h5>
                  <List>
                    {
                      userData.data.communities.map(community => (
                        <ListItem>
                          <a
                            key={community.id}
                            href={`/community/${community.id}`}
                          >
                            {community.name}
                          </a>
                        </ListItem>
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
