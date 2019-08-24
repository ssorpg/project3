// COMPONENTS
import React from 'react';
import { Button } from 'react-bootstrap';
import CommunityRadio from './communityradio';
import { Paper, FormControl, FormGroup,
  RadioGroup, List} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function SelectFromExisting({
  communities,
  CommunityId,
  handleChosenCommunitySubmit,
  handleRadioSelection,
  handleFormChange
}) {
  
  const useStyles = makeStyles( theme => ({
    communityList: {
      padding: '24px'
    },
    fixedSizeList: {
      maxHeight: '12vh',
      overflow: 'scroll'
    }
  }));
  const classes = useStyles();

  return (
    <Paper className={classes.communityList}>
      <h3>Choose A Community</h3>
      <FormControl onSubmit={handleChosenCommunitySubmit}>
        <FormGroup>
          <List className={classes.fixedSizeList}
            className="list-unstyled text-left"
            style={{ columns: 2 }}
            id="community-list"
          >
            {communities.map(community => (
              <RadioGroup key={community.id}>
                <CommunityRadio
                  CommunityId={CommunityId}
                  community={community}
                  handleRadioSelection={handleRadioSelection}
                />
              </RadioGroup>
            ))}
          </List>
        </FormGroup>
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </FormControl>
      <Button className="btn btn-success" onClick={handleFormChange}>
        Or Create Your Own!
      </Button>
    </Paper>
  );
}
