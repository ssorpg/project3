import React from 'react';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Link,
  SvgIcon
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItem: {
    borderBottom: '1px solid #ddd',
    marginBottom: '48px'
  }
}));

export default function SearchItem(props) {
  const classes = useStyles();
  const {data: {searchResults}} = props;
  return (
    searchResults ?
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List
            className="list-unstyled text-left"
            style={{
              padding: '24px'
            }}
          >
            {
              searchResults.map(item => (
                <ListItem
                  key={item.id}
                  cols="2"
                  rows="auto"
                  className={classes.listItem}
                >

                  <ListItemAvatar>
                    <Avatar>
                      <SvgIcon>
                      <path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </SvgIcon>
                    </Avatar>
                  </ListItemAvatar>
                  <header>
                    <h4>
                      <Link href={`/community/${item.id}`}>
                        {item.name}
                      </Link>
                    </h4>
                  </header>
                  
                    {
                      item.members.length > 0 ?
                      <Grid container spacing={2} style={{padding: '6px'}}>
                        <Grid item xs={12}>
                          <h6>Community Members:</h6>
                          <ul className="list-unstyled members">
                            {
                              item.members.map(member => (
                                <li key={member.id}>
                                  <p>
                                    <a href={`/community/${item.id}/friend/${member.id}/`}>
                                      {member.name}
                                    </a>
                                  </p>
                                </li>
                              ))
                            }
                          </ul>
                        </Grid>
                        </Grid>
                      :
                        ''
                    }

                </ListItem>
              ))
            }
          </List>
        </Grid>
      </Grid>
      : 'Nothing found.'
  ) 
}