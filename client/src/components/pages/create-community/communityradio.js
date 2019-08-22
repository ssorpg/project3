// COMPONENTS
import React from 'react';
import { Form, ListGroupItem } from 'react-bootstrap';

export default function CommunityRadio({ CommunityId, com, handleRadioSelection }) {
  console.log('State comm id: ', CommunityId);
  console.log('Current comm id: ', com.id);

  return (
    <ListGroupItem className="radio" name="community" onClick={handleRadioSelection}>
      <Form.Check type="radio"
        name="community"
        id={com.id}
        value={com.id}
        label={com.name}
        onChange={handleRadioSelection}
        checked={CommunityId === com.id}
      />
    </ListGroupItem>
  )
}