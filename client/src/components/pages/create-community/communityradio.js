// COMPONENTS
import React from 'react';
import { Form, ListGroupItem } from 'react-bootstrap';

export default function CommunityRadio({ CommunityId, community, handleRadioSelection }) {
  return (
    <ListGroupItem className="radio" name="community" onClick={handleRadioSelection}>
      <Form.Check type="radio"
        name="community"
        id={community.id}
        value={community.id}
        label={community.name}
        onChange={handleRadioSelection}
        checked={CommunityId === community.id}
      />
    </ListGroupItem>
  )
}