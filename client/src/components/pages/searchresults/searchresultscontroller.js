// COMPONENTS
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';
import CommunityResults from './communityresults';

// CSS
import './styles.css';

// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

class SearchResultsController extends Component {
  constructor() {
    super();

    this.state = {
      searchResults: []
    };
  };

  componentDidMount() {
    this.getData();
  };

  getData = async () => {
    try {
      const res = await ax.get(`/api/search${this.props.location.search}`); // looks like: /api/search?q=something

      this.setState({ searchResults: res.data });
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  render() {
    return (
      <Container maxWidth="md" id="search">
        <Paper style={{ padding: '24px' }}>
          <h1>Search Results</h1>
          <CommunityResults
            {...this.props}
            searchResults={this.state.searchResults}
          />
        </Paper>
      </Container>
    );
  };
}


export default withRouter(SearchResultsController);