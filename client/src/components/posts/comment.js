// COMPONENTS
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirmation from '../confirmation';

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
          <Confirmation
            color='black'
            buttonText={<DeleteIcon />}
            title='Delete this comment?'
            question='Clicking confirm will permanently remove the comment.'
            action={() => deleteComment(thisComment.PostId, thisComment.id)}
            className={classes.delete}
          />
          : ''
      }
    </p>
  );
}
