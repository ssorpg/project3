// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import CommunityResults from './communityresults';

// FUNCTIONS
import { withRouter } from 'react-router-dom';
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
        <CommunityResults
          {...this.props}
          searchResults={this.state.searchResults}
        />
      </Container>
    );
  };
}


export default withRouter(SearchResultsController);