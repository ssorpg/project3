// COMPONENTS
import React from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography, CardMedia, Grid } from '@material-ui/core';
import Status from '../status';
import Communities from './communities';
import Invites from './invites';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import ExtractProfileImage from '../../utils/extractprofileimage';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 'auto',
    // marginTop: '20px'
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
  const { YourProfile, user } = props;

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item md={6}>
          <CardHeader
            avatar={
              <Avatar aria-label="friend" className={classes.avatar} />
            }
            title={<h3>{user.name}</h3>}
            subheader={
              <>
                <i>{user.location}</i><br />
                Status: <i>{user.status}</i>
              </>
            }
          />
          <Card className={classes.card2}>
            <CardMedia
              className={classes.media}
              image={ExtractProfileImage(user)}
              title="Profile"
            />
          </Card>
          {
            user.id === YourProfile.id ?
              <Status {...props} />
              : ''
          }
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
          <Communities {...props} />
          : ''
      }
      {
        user.invites ?
          <Invites {...props} />
          : ''
      }
    </Card>
  );
}
