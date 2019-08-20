import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../card.js';
import ax from 'axios';

export default class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: undefined,
      UserId: parseInt(props.match.params.UserId),
      CommunityId: parseInt(props.match.params.CommunityId)
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await ax.get('/api/communities/' + this.props.match.params.CommunityId + '/users');

      this.setState({ friends: res.data.members });
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container id="friends">
        <Row>
          <Col>
            <h1>Friends</h1>
          </Col>
        </Row>
        <Row>
          {
            this.state.friends
              ? this.state.friends.map(friend => (
                <Col xs={4} md={3} lg={2}>
                  <a href={"/community/" + this.state.CommunityId + "/users/" + friend.id}>
                    <Card cardClass={"text-dark text-left card"}>
                      <nav className="card-nav">
                        {/* <button class="btn btn-default" className="favorite"></button> */}
                        {/* <button class="btn btn-default" className="select"></button> */}
                      </nav>
                      <img class="card-img-top" src="http://place-hold.it/150" alt="" />
                      <div class="card-body">
                        <h5 className="card-title">{friend.name}</h5>
                      </div>
                    </Card>
                  </a>
                </Col>
              ))
              : ''
          }
        </Row>
      </Container>
    )
  }
}