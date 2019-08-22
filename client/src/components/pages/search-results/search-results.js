import React, { Component, Link } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ax from 'axios';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    }
    
    this.getData(props.location.search, props);
  }

  getData = async (searchString, props) => {
    try {
      const { data } = await ax.get(`/api/search/${searchString}`);
      
      this.setState({
        data: data
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

              {this.state.data !== undefined ?
                <Row>
                  <Col xs={12}>
                    <header>
                      <h3>Results</h3>
                    </header>
                    <ul className="list-unstyled text-left">
                      {this.state.data.map(item => (
                        <li key={item.id}>
                          <h4>
                            <a href={`/community/${item.id}`}>
                              {item.name}
                            </a>
                          </h4>

                            <Row>
                          {item.members.length > 0 ?
                              <Col>
                                <h6>Community Members:</h6>
                                <ul className="list-unstyled members">
                                  {item.members.map(member => (
                                    <li key={member.id}>
                                      <p className="small">
                                        <a href={`/community/${item.id}/friend/${member.id}/`}>
                                          {member.name}
                                        </a>
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                          </Col>
                            :
                            ''
                          }
                        </Row>
                          
                          {item.Events.length > 0 ?
                            <Row>
                              <Col>
                                <h6>Community Members:</h6>
                                <ul className="Events list-unstyled">
                                  {item.Events.map( item => (
                                  <li key={item.id}>
                                    <p className="small">
                                      <a href={`/community/${item.id}/event/${item.id}/`}>
                                        {item.name}
                                      </a>
                                    </p>
                                  </li>
                                  ))}
                                </ul>
                              </Col>
                            </Row>
                            :
                            ''
                          }
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
                :
                  'didnt find anything'
              }
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}