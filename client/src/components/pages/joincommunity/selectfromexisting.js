// COMPONENTS
import React from 'react';
import { Paper, FormGroup, RadioGroup, List, Button, InputLabel, Typography } from '@material-ui/core';
import CommunityRadio from './communityradio';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
    margin: theme.spacing(1.5)
  }
}));

export default function SelectFromExisting(props) {
  const { communities, handleFormChange, handleChosenCommunitySubmit } = props;

  const classes = useStyles();
  //console.log(communities);
  return (
    <Paper className={classes.communityList}>
      <form onSubmit={handleChosenCommunitySubmit}>
        <FormGroup>
          <InputLabel>
            <Typography variant="h5" gutterBottom>
              Choose a Community
            </Typography>
          </InputLabel>
          <List className={classes.fixedSizeList + 'list-unstyled text-left'} id="community-list">
            {
              communities.length ?
                communities.map(community => (
                  <RadioGroup key={community.id}>
                    <CommunityRadio
                      {...props}
                      thisComm={community}
                    />
                  </RadioGroup>
                ))
                : <h6>No public communities found.</h6>
            }
          </List>
        </FormGroup>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={handleFormChange}
        >
          Or Create Your Own!
        </Button>
      </form>
    </Paper>
  );
}
