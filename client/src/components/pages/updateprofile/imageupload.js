// COMPONENTS
import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  inputSpacing: {
    marginLeft: '4px',
    padding: '2px'
  }
}));

export default function ImageUpload({ handlePicChange, handlePicSubmit }) {
  const classes = useStyles();

  return (
    <form onSubmit={handlePicSubmit}>
      <input
        className={classes.inputSpacing}
        type="file"
        name="selectedFile"
        onChange={handlePicChange}
      />
      <br /><br />
      <Button variant="contained" color="primary" type="submit" >
        Upload
        <CloudUploadIcon />
      </Button>
    </form>
  );
}