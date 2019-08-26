// COMPONENTS
import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

export default function ImageUpload({ onSubmit, onSelectFile }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        style={{ marginLeft: '4px', padding: '2px' }}
        type="file"
        name="selectedFile"
        onChange={onSelectFile}
      />
      <br /><br />
      <Button variant="contained" color="primary" type="submit" >
        Upload
        <CloudUploadIcon />
      </Button>
    </form>
  );
}