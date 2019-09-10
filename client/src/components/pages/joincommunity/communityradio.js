// COMPONENTS
import React from 'react';
import { FormControlLabel, Radio, ListItem } from '@material-ui/core';

export default function CommunityRadio(props) {
  const { selectedCommId, handleRadioSelection, thisComm } = props;
  
  return (
    <ListItem className="radio">
      <FormControlLabel
        control={<Radio />}
        name="community"
        id={thisComm.id}
        value={thisComm.id}
        label={thisComm.name}
        onChange={handleRadioSelection}
        checked={selectedCommId === thisComm.id}
      />
    </ListItem>
  );
};
