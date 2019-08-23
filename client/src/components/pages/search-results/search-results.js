// COMPONENTS
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: undefined
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
      <Container>
        <h1>Search Results Page</h1>
        <Row>
          <Col>
            <div className="well bg-light">
              <h1>RESULTS</h1>

              {
                this.state.searchResults ?
                  <Row>
                    <Col xs={12}>
                      <header>
                        <h3>Results</h3>
                      </header>
                      <ul className="list-unstyled text-left">
                        {
                          this.state.searchResults.map(item => (
                            <li key={item.id}>
                              <h4>
                                <a href={`/community/${item.id}`}>
                                  {item.name}
                                </a>
                              </h4>

                              <Row>
                                {
                                  item.members.length ?
                                    <Col>
                                      <h6>Community Members:</h6>
                                      <ul className="list-unstyled members">
                                        {
                                          item.members.map(member => (
                                            <li key={member.id}>
                                              <p className="small">
                                                <a href={`/community/${item.id}/friend/${member.id}/`}>
                                                  {member.name}
                                                </a>
                                              </p>
                                            </li>
                                          ))
                                        }
                                      </ul>
                                    </Col>
                                    : ''
                                }
                              </Row>

                              {/* { // events not implemented
                                item.Events.length ?
                                  <Row>
                                    <Col>
                                      <h6>Community Members:</h6>
                                      <ul className="Events list-unstyled">
                                        {
                                          item.Events.map(item => (
                                            <li key={item.id}>
                                              <p className="small">
                                                <a href={`/community/${item.id}/event/${item.id}/`}>
                                                  {item.name}
                                                </a>
                                              </p>
                                            </li>
                                          ))
                                        }
                                      </ul>
                                    </Col>
                                  </Row>
                                  : ''
                              } */}
                            </li>
                          ))
                        }
                      </ul>
                    </Col>
                  </Row>
                  : 'Nothing found.'
              }
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}