// COMPONENTS
import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  comment: {
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between'
  },

  commentText: {
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: '80%'
  },

  delete: {
    padding: 0,
    height: '24px',
    minWidth: '48px',
    width: '20%'
  }
});

export default function Comment(props) {
  const { YourProfile, thisComment, deleteComment } = props;
  
  const classes = useStyles();

  return (
    <p className={classes.comment}>
      <span className={classes.commentText}>
        <strong>{thisComment.author.name}</strong>: {thisComment.message}
      </span>
      {
        YourProfile.id === thisComment.author.id ?
          <Button
            type="submit"
            title="Delete Comment"
            data-id={thisComment.id}
            data-postid={thisComment.PostId}
            onClick={deleteComment}
            className={classes.delete}
          >
            <DeleteIcon style={{ pointerEvents: 'none' }} /> {/* pointerEvents prevents being the target of event listeners */}
          </Button>
          : ''
      }
    </p>
  );
}
