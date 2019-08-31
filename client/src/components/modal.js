// COMPONENTS
import React from 'react';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  error: {
    zIndex: '99',
    minWidth: '150px',
    margin: '10px'
  }
}));

export default function Modal({ error }) {
  const classes = useStyles();

  function removeErrors() { // dismiss error messages by clicking on them
    const errors = document.getElementsByClassName('error');

    for (let i = 0; i < errors.length; i++) { // can't use foreach on a list :(
      errors[i].style.display = 'none';
    }
  }

  return (
    <div onClick={removeErrors} className={classes.error + " error"}>
      {
        error ?
          <div className="alert alert-danger">
            <strong>Error: </strong>
            {error}
          </div>
          : ''
      }
    </div>
  )
}