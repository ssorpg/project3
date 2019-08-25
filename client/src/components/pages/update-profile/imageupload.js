// COMPONENTS
import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

export default function ImageUpload({ onSubmit, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      {/* <input
          type="text"
          name="description"
          value={description}
          onChange={onChange}
        /> */}
      <input
        style={{ marginLeft: '4px', padding: '2px' }}
        type="file"
        name="selectedFile"
        onChange={onChange}
      />
      <br /><br />
      <Button variant="contained" color="primary" type="submit" >
        Upload
        <CloudUploadIcon />
      </Button>
    </form>
  );
}