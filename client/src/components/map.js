import React from "react";
// FUNCTIONS
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  map: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '350px',
    frameBoarder: '0',
    border: 'none',
    marginBotton: '24px'
  }
}));

export default function GoogleMap(props) {
  const classes = useStyles();

  // <Map google={props.google} zoom={14} className={classes.map} />
  // initialCenter={props.location}
  try {
    return (
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyASU2wiCjMrhc5-xK1FjDzDyuFI0cyWqx0&q=${props.location}`}
        allowFullScreen
        className={classes.map}
        title="Location Map"
      ></iframe>
    );
  } catch (error) {
    console.log("err0r", error);
  }
}
