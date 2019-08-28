// COMPONENTS
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CommentOnPosts from './commentOnPosts';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import ExtractProfileImage from '../utils/extractprofileimage';

const useStyles = makeStyles({
  media: {
    paddingTop: '100%'
  },

  score: {
    position: 'absolute',
    bottom: '10px',
    right: '10px'
  }
});

export default function MediaCard({ YourId, CommunityId, post, vote, deletePost }) {
  const classes = useStyles();

  function goToAuthor() {
    const goTo = YourId === post.author.id ?
      `/profile`
      : `/community/${CommunityId}/friends/${post.author.id}`

    window.location = goTo;
  }
  // console.log(post.author);

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
            {post.message}
          </Typography>
          <div className={classes.score}>
            Likes: {post.score}
          </div>
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
      <CommentOnPosts post={post} />
    </Card>
  );
}
