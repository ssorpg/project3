import React from "react";
// FUNCTIONS
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  map: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "350px",
    frameBoarder: "0",
    border: "none",
    marginBotton: "24px"
  }
}));

export default function GoogleMap(props) {
  const classes = useStyles();

  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyASU2wiCjMrhc5-xK1FjDzDyuFI0cyWqx0&q=${props.location}`}
      allowFullScreen
      className={classes.map}
      title="Location Map"
    ></iframe>
  );
}
