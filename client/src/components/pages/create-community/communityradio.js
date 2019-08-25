// COMPONENTS
import React from 'react';
import { FormControlLabel, Radio, ListItem } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

export default function CommunityRadio({ CommunityId, community, handleRadioSelection }) {
  // const useStyles = makeStyles({});
  // const classes = useStyles();

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