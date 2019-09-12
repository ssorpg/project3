// COMPONENTS
import React from 'react';

// FUNCTIONS
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  map: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '350px',
    frameBorder: 0,
    border: 'none'
  }
}));

export default function GoogleMap(props) {
  const classes = useStyles();

  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyASU2wiCjMrhc5-xK1FjDzDyuFI0cyWqx0&q=${props.location}`}
      allowFullScreen
      className={classes.map + " theme-mbx2"}
      title="Location Map"
    />
  );
};
