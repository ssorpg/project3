// COMPONENTS
import React from 'react';
import { Form, ListGroupItem } from 'react-bootstrap';

export default function CommunityRadio({ com, handleRadioSelection }) {
  return (
    <ListGroupItem className="radio" name="community" key={com.id.toString()}>
      <Form.Check type="radio"
        name="community"
        data-id={com.id.toString()}
        label={com.name}
        onClick={handleRadioSelection}
      />
    </ListGroupItem>
  )
}