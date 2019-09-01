// COMPONENTS
import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import CommentController from './commentcontroller';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import ExtractProfileImage from '../../utils/extractprofileimage';

const useStyles = makeStyles({
  media: {
    paddingTop: '100%'
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
  const classes = useStyles();
  const { YourId, post, vote, deletePost } = props;

  function goToAuthor() {
    const goTo = YourId === post.author.id ?
      '/profile'
      : `/community/${post.CommunityId}/friends/${post.author.id}`;

    window.location = goTo;
  }

  return (
    <Card>
      <CardActionArea onClick={goToAuthor}>
        <CardMedia
          className={classes.media}
          image={ExtractProfileImage(post.author)}
          title="Profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.author.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <span className={classes.postText}>{post.message}</span>
          </Typography>
          <Typography className={classes.score}>
            Likes: {post.score}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={vote} data-id={post.id} data-vote={"like"}>
          Like
        </Button>
        <Button size="small" color="secondary" onClick={vote} data-id={post.id} data-vote={"dislike"}>
          Dislike
        </Button>
        {
          YourId === post.author.id ?
            <Button size="small" color="secondary" onClick={deletePost} data-id={post.id}>
              Delete
            </Button>
            : ''
        }
      </CardActions>
      <CommentController {...props} post={post} />
    </Card>
  );
}
