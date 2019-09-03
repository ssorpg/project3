// COMPONENTS
import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import CommentController from './commentcontroller';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import ExtractProfileImage from '../../utils/extractprofileimage';

const useStyles = makeStyles({
  media: {
    paddingTop: '25%',
    margin: '15px',
    width: '25%',
    float: 'left'
  },

  postText: {
    wordWrap: 'break-word',
    overflowWrap: 'break-word'
  },

  score: {
    position: 'absolute',
    bottom: '-25px',
    right: '10px'
  }
});

export default function Post(props) {
  const { YourProfile, thisPost, vote, deletePost } = props;

  const classes = useStyles();

  function goToAuthor() {
    const goTo = YourProfile.id === thisPost.author.id ?
      '/profile'
      : `/community/${thisPost.CommunityId}/friends/${thisPost.author.id}`;

    window.location = goTo;
  };

  return (
    <Card>
      <CardActionArea onClick={goToAuthor}>
        <CardMedia
          className={classes.media}
          image={ExtractProfileImage(thisPost.author)}
          title="Profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {thisPost.author.name}
          </Typography>
          <Typography variant="body" component="p">
            <span className={classes.postText}>{thisPost.message}</span>
          </Typography>
          <Typography className={classes.score}>
            Likes: {thisPost.score}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={vote} data-id={thisPost.id} data-vote={"like"}>
          Like
        </Button>
        <Button size="small" color="secondary" onClick={vote} data-id={thisPost.id} data-vote={"dislike"}>
          Dislike
        </Button>
        {
          YourProfile.id === thisPost.author.id ?
            <Button size="small" color="secondary" onClick={deletePost} data-id={thisPost.id}>
              Delete
            </Button>
            : ''
        }
      </CardActions>
      <CommentController {...props} thisPost={thisPost} />
    </Card>
  );
};
