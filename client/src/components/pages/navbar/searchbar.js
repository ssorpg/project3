// COMPONENTS
import React, {Component} from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    }
  }
  //TODO move search input to be hidden if not logged in

  handleInputChange = event => {
    this.setState({
      searchQuery: event.target.value
    });
  }
  //todo remove init data grab and let users troll entire db
  //todo maybe add paging to results
  handleSearchSubmit = event => {
    event.preventDefault();
    window.location = `/search?q=${this.state.searchQuery}`;
  }

  render() {
    return (
      <Form inline onSubmit={this.handleSearchSubmit}
        style={{ position: 'relative' }}>
        <FormControl
          type="text"
          placeholder="Search" className="mr-sm-2"
          onChange={this.handleInputChange}
          id="search-input"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    )
  }
}