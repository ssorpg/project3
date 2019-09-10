// COMPONENTS
import React from 'react';
import { Avatar, Grid, List, ListItem, ListItemAvatar, Link, SvgIcon, Paper } from '@material-ui/core';
import MemberResults from './memberresults';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItem: {
    marginBottom: '48px'
  },

  fitWidth: {
    display: 'flex',
    marginRight: '24px'
  }
}));

export default function CommunityResults(props) {
  const { searchResults } = props;

  const classes = useStyles();

  return (
  <Paper className="theme-paddingx2">
    <h1>Search Results</h1>
    {
      searchResults.length ?
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List className="list-unstyled text-left theme-paddingx2">
              {
                searchResults.map(community => 
                  <ListItem
                    key={community.id}
                    cols="2"
                    rows="auto"
                    className={classes.listItem + " gray-divider"}
                  >
                    <Grid container spacing={2}>
                      <Grid item className={classes.fitWidth}>
                        <ListItemAvatar>
                          <Avatar>
                            <SvgIcon>
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48
                              10 10 10 10-4.48 10-10S17.52 2 12 2zM8
                              17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5
                              2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5
                              2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5
                              1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38
                              9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5
                              2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </SvgIcon>
                          </Avatar>
                        </ListItemAvatar>
                        <header>
                          <h4>
                            <Link href={`/community/${community.id}`}>
                              {community.name}
                            </Link>
                          </h4>
                        </header>
                      </Grid>
                      <MemberResults thisCommunity={community} {...props} />
                    </Grid>
                  </ListItem>
                )
              }
            </List>
          </Grid>
        </Grid>
      : <Grid container spacing={2}>
        <Grid item xs={12}>
          <h5>Nothing found.</h5>
        </Grid>
      </Grid>
    }
    </Paper>
  );
};
