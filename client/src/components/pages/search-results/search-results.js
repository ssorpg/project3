// COMPONENTS
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Link,
  SvgIcon
} from '@material-ui/core';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';
import './styles.css';

class SearchResults extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      searchResults: undefined,
    }
  }
  
  componentDidMount() {
    this.getData(this.props.location.search);
  }

  getData = async searchString => {
    try {
      const searchResults = await ax.get(`/api/search/${searchString}`);

      this.setState({
        searchResults: searchResults.data
      });
    }
    catch (error) {
      CheckError(error);
    }
  }

  render() {
    
    return (
        <Container maxWidth="md">
          <Paper style={{padding: '24px'}}>
            <h1>Search Results Page</h1>
              <div>

                {
                  this.state.searchResults ?
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <List
                          className="list-unstyled text-left"
                          style={{
                            padding: '24px'
                          }}
                        >
                          {
                            this.state.searchResults.map(item => (
                              <ListItem
                                key={item.id}
                                cols="2"
                                rows="auto"
                                style={{
                                  borderBottom: '1px solid #ddd',
                                  marginBottom: '48px'
                                }}
                              >
                              {console.log(item)}
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
                                    <Grid container className={this.state.root} spacing={2} style={{padding: '6px'}}>
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
                }
              </div>
            </Paper>
        </Container>
    )
  }
}


export default withRouter(SearchResults);