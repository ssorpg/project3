// COMPONENTS
import React from 'react';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  alert: {
    zIndex: '99',
    minWidth: '150px',
    margin: 0
  }
}));

export default function Modal(props) {
  const { error, success } = props;
  const classes = useStyles();

  function dismissAlerts() { // dismiss error messages by clicking on them
    const errors = document.getElementsByClassName('error');

    for (let i = 0; i < errors.length; i++) { // can't use foreach on a list :(
      errors[i].style.display = 'none';
    }
  }

  return (
    <div onClick={dismissAlerts} className={classes.alert + " alert"}>
      {
        error ?
          <div className="alert alert-danger">
            <strong>Error: </strong>
            {error}
          </div>
          : ''
      }
      {
        success ?
          <div className="alert alert-success">
            <strong>Success: </strong>
            {success}
          </div>
          : ''
      }
    </div>
  )
}