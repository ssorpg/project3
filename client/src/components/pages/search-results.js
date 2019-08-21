import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ax from 'axios';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: undefined,
      users: undefined,
      events: undefined
    }
    this.breakOutSearchTerms(props.location.search, props);
  }

  breakOutSearchTerms = async (searchString, props) => {
    // let newString = searchString.replace(/(^\?|%20)/gm, ' ');
    // console.log(newString);
    try {
      const {data} = await ax.get(`/api/search/${searchString}`);
      const {communities, users, events} = data;
      
      this.setState({
        communities: communities,
        users: users,
        events: events
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container>
        <h1>Search Results Page</h1>

        <Row>
          <Col>
            <div className="well bg-light">
              <h1>RESULTS</h1>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}