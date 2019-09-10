// COMPONENTS
import React from 'react';
import { Paper, FormGroup, RadioGroup, List, Button, InputLabel, Typography } from '@material-ui/core';
import CommunityRadio from './communityradio';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  communityList: {
    maxHeight: '12vh',
    overflow: 'auto'
  }
}));

export default function SelectFromExisting(props) {
  const { communities, handleFormChange, handleChosenCommunitySubmit } = props;

  const classes = useStyles();

  // console.log(communities);

  return (
    <Paper className="theme-paddingx2">
      <form onSubmit={handleChosenCommunitySubmit}>
        <FormGroup>
          <InputLabel>
            <Typography variant="h5" gutterBottom>
              Choose a Public Community
            </Typography>
          </InputLabel>
          <List className={classes.communityList + " list-unstyled text-left"} id="community-list">
            {
              communities.length ?
                communities.map(community =>
                  <RadioGroup key={community.id}>
                    <CommunityRadio
                      {...props}
                      thisComm={community}
                    />
                  </RadioGroup>
                )
                : <h6>No public communities found.</h6>
            }
          </List>
        </FormGroup>
        <Button
          className="inline-button"
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className="inline-button"
          variant="outlined"
          color="primary"
          onClick={handleFormChange}
        >
          Or Create Your Own!
        </Button>
      </form>
    </Paper>
  );
};
