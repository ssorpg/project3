// COMPONENTS
import React from 'react';
import { FormControlLabel, Radio, ListItem } from '@material-ui/core';

export default function CommunityRadio({ CommunityId, community, handleRadioSelection }) {
  return (
    <ListItem className="radio">
      <FormControlLabel
        control={<Radio />}
        name="community"
        id={community.id}
        value={community.id}
        label={community.name}
        onChange={handleRadioSelection}
        checked={CommunityId === community.id}
      />
    </ListItem>
  )
}