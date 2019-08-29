// COMPONENTS
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';
import SearchItem from './searchitem';

// CSS
import './styles.css';

// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

class SearchResults extends Component {
  constructor() {
    super();

    this.state = {
      searchResults: undefined,
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const results = await ax.get(`/api/search${this.props.location.search}`); // looks like: /api/search?q=something

      this.setState({ searchResults: results.data });
    }
    catch (error) {
      PageLoadError(error);
    }
  }

  render() {
    return (
      <Container maxWidth="md" id="search">
        <Paper style={{ padding: '24px' }}>
          <h1>Search Results</h1>
          <SearchItem searchResults={this.state.searchResults} />
        </Paper>
      </Container>
    )
  }
}


export default withRouter(SearchResults);