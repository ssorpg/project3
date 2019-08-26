// COMPONENTS
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Paper } from '@material-ui/core';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

// COMPONENT SPECIFIC IMPORTS
import SearchItem from './search-item';
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
      const results = await ax.get(`/api/search/${searchString}`);

      this.setState({
        searchResults: results.data
      });
    }
    catch (error) {
      CheckError(error);
    }
  }

  render() {

    return (
      <Container maxWidth="md" id="search">
        <Paper style={{ padding: '24px' }}>
          <h1>Search Results Page</h1>
          <SearchItem data={this.state} />
        </Paper>
      </Container>
    )
  }
}


export default withRouter(SearchResults);