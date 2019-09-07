// COMPONENTS
import React from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography, CardMedia, Grid } from '@material-ui/core';
import Status from './status';
import Communities from './communities';
import Invites from './invites';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import ExtractProfileImage from '../../utils/extractprofileimage';

const useStyles = makeStyles(theme => ({
  profileAvatar: {
    backgroundColor: '#3f51b5',
    backgroundImage: 'url(https://i.ibb.co/6WVS2GB/tpn2.png)'
  },

  profileImageContainer: {
    maxWidth: '500px',
    marginLeft: '24px',
    marginBottom: '24px'
  }
}));

export default function ProfileInfo(props) {
  const { YourProfile, user } = props;

  const classes = useStyles();

  return (
    <Card>
      <Grid container>
        <Grid item md={6}>
          <CardHeader
            avatar={
              <Avatar aria-label="friend" className={classes.profileAvatar} />
            }
            title={<h3>{user.name}</h3>}
            subheader={
              /* this looks ugly from lines 39 to 48 - TODO make less ugly */
              <>
                <i>{user.location}</i><br />
                {
                  user.status ?
                    <>
                      Status: <i>{user.status}</i>
                    </>
                    : ''
                }
              </>
            }
          />
          <div className={classes.profileImageContainer}>
            {
              user.id === YourProfile.id ?
                <Status {...props} />
                : ''
            }
            <Card>
              <CardMedia
                className="full-image"
                image={ExtractProfileImage(user)}
                title="Profile"
              />
            </Card>
          </div>
        </Grid>
        <Grid item md={6}>
          <CardContent>
            <Typography paragraph>
              <span className="h4">Profile</span>
            </Typography>
            <Typography paragraph>
              <strong>Bio:</strong> {user.bio ? user.bio : 'This user has no bio yet.'}
            </Typography>
            <Typography paragraph>
              <strong>Location:</strong> {user.location ? user.location : 'Unknown'}
            </Typography>
          </CardContent>
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
