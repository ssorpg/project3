// COMPONENTS
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

// FUNCTIONS
import ExtractProfileImage from '../../../utils/extractprofileimage';

export default function Friend(props) {
  const { YourProfile, CommunityId, thisFriend } = props;

  function goToFriend() {
    const goTo = YourProfile.id === thisFriend.id ?
      '/profile'
      : `/community/${CommunityId}/friends/${thisFriend.id}`;

    window.location = goTo;
  };

  // console.log(thisFriend);

  return (
    <Card>
      <CardActionArea onClick={goToFriend}>
        <CardMedia
          className="full-image"
          image={ExtractProfileImage(thisFriend)}
          title="Profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {thisFriend.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
