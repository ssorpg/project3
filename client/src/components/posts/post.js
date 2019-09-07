// COMPONENTS
import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import CommentController from './commentcontroller';
import Confirmation from '../confirmation';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import ExtractProfileImage from '../../utils/extractprofileimage';

const useStyles = makeStyles({
  postProfileImage: {
    paddingTop: '25%', // 1/4 size image
    width: '25%',
    margin: '12px',
    float: 'left'
  },

  postScore: {
    position: 'absolute',
    bottom: '-24px',
    right: '12px'
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
          className={classes.postProfileImage}
          image={ExtractProfileImage(thisPost.author)}
          title="Profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {thisPost.author.name}
          </Typography>
          <Typography variant="body1" component="p">
            <span className="message-wrap">{thisPost.message}</span>
          </Typography>
          <Typography className={classes.postScore}>
            Likes: {thisPost.score}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {thisPost === undefined ? (
          <>
          <Button size="small" color="primary" onClick={() => vote(thisPost.id, 'like')}>
            Like
          </Button>
          <Button size="small" color="secondary" onClick={() => vote(thisPost.id, 'dislike')}>
            Dislike
          </Button>
          </>
        )
        :
        ''
        }
        {
          YourProfile.id === thisPost.author.id ?
            <Confirmation
              buttonText='Delete'
              title='Delete this post?'
              question='Clicking confirm will permanently remove the post.'
              action={() => deletePost(thisPost.id)}
            />
            : ''
        }
      </CardActions>
      <CommentController {...props} thisPost={thisPost} />
    </Card>
  );
};
