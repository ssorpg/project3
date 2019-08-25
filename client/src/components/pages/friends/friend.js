// COMPONENTS
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import GetProfileImage from '../../../utils/getprofileimage';

const useStyles = makeStyles({
  media: {
    paddingTop: '100%' // 16:9
  }
});

export default function MediaCard({ YourId, CommunityId, friend }) {
  const classes = useStyles();

  function goToFriend() {
    const goTo = YourId === friend.id ?
      `/profile`
      : `/community/${CommunityId}/friends/${friend.id}`

    window.location = goTo;
  }

  console.log(friend);

  return (
    <Card>
      <CardActionArea onClick={goToFriend}>
        <CardMedia
          className={classes.media}
          image={GetProfileImage(friend)}
          title="Profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {friend.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
