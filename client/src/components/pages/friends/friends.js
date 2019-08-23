// COMPONENTS
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Friend from './friend';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';
import GetYourId from '../../../utils/getyourid';

export default class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: undefined,
      YourId: GetYourId(),
      CommunityId: parseInt(props.match.params.CommunityId)
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await ax.get(`/api/communities/${this.props.match.params.CommunityId}/users`);

      this.setState({ friends: res.data.members });
    }
    catch (error) {
      CheckError(error);
    }
  }

  render() {
    return (
      <Container id="friends" style={{ textAlign: 'center' }}>
        <Row>
          <Col>
            <h1>Friends</h1>
          </Col>
        </Row>
        <Row>
          {
            this.state.friends ?
              this.state.friends.map(friend => (
                this.state.YourId === friend.id ?
                  ''
                  : <Friend
                    friend={friend}
                    CommunityId={this.state.CommunityId}
                  />
              ))
              : ''
          }
        </Row>
      </Container>
    )
  }
}