// COMPONENTS
import React from 'react';
import CommunityRadio from './communityradio';
import { Paper, FormControl, FormGroup,
  RadioGroup, List, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function SelectFromExisting({
  communities,
  CommunityId,
  handleChosenCommunitySubmit,
  handleRadioSelection,
  handleFormChange,
  handleFormReset
}) {
  
  const useStyles = makeStyles( theme => ({
    communityList: {
      padding: '24px'
    },
    fixedSizeList: {
      maxHeight: '12vh',
      overflow: 'scroll'
    },
    button: {
      display: 'inline-block',
      verticalAlign: 'center',
      margin: theme.spacing(1)
    }
  }));
  const classes = useStyles();

  return (
    <Paper className={classes.communityList}>
      <h3>Choose A Community</h3>
      <form onSubmit={handleChosenCommunitySubmit}
        onReset={handleFormReset}>
        <FormGroup>
          <List className={classes.fixedSizeList}
            className="list-unstyled text-left"
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
        <Button className={classes.button}
          variant="contained" color="primary" 
          type="submit">Submit</Button>
          <Button className={classes.button}
            variant="outlined" color="primary"
            onClick={handleFormChange}
          >
            Or Create Your Own!
          </Button>
      </form>
    </Paper>
  );
}
