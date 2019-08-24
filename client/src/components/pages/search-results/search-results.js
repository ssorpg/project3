// COMPONENTS
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Container,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemTest,
  Link,
  Box
} from '@material-ui/core';

import ImageIcon from '@material-ui/icons/Image';
// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';


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
                                <ListItemAvatar>
                                  <Avatar>
                                    <ImageIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <header>
                                  <h4>
                                    <Link href={`/community/${item.id}`}>
                                      {item.name}
                                    </Link>
                                  </h4>
                                </header>

                                <Grid container className={this.state.root} spacing={2} style={{padding: '6px'}}>
                                  {
                                    item.members.length ?
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
                                      : ''
                                  }
                                </Grid>

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