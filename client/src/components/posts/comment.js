// COMPONENTS
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirmation from '../confirmation';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  commentText: {
    width: '80%'
  },

  deleteButton: {
    width: '20%'
  }
});

export default function Comment(props) {
  const { YourProfile, thisComment, deleteComment } = props;

  const classes = useStyles();

  return (
    <p className="text-left flex-between">
      <span className={classes.commentText + " message-wrap"}>
        <strong>{thisComment.author.name}</strong>: {thisComment.message}
      </span>
      {
        YourProfile.id === thisComment.author.id ?
          <Confirmation
            color='default'
            buttonText={<DeleteIcon />}
            title='Delete this comment?'
            question='Clicking confirm will permanently delete this comment.'
            action={() => deleteComment(thisComment.PostId, thisComment.id)}
            className={classes.deleteButton}
          />
          : ''
      }
    </p>
  );
};
