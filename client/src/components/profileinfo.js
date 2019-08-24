import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Card, List, ListItem,
  CardHeader, CardContent,
  CardActions, Collapse,
  Avatar, IconButton, Typography,
  CardMedia, Divider
} from '@material-ui/core';
import GetProfileImage from '../utils/getprofileimage';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 'auto',
    marginTop: '20px'
  },
  card2: {
    maxWidth: '500px',
    marginTop: '20px',
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
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
    backgroundColor: green[500],
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
              title={<h3>{userData.data.name}</h3>}
              subheader={<i>{userData.data.location}</i>}
            />
            <Card
              className={classes.card2}
            >
              <CardMedia
                className={classes.media}
                image={GetProfileImage(userData.data)}
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
                  <strong>Bio:</strong> {userData.data.bio}
                </Typography>
                <Typography paragraph>
                  <strong>Location:</strong> {userData.data.location}
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
                        <>
                          <ListItem button component="a">
                            <a
                              key={community.id}
                              href={`/community/${community.id}`}
                            >
                              {community.name}
                            </a>
                          </ListItem>
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
