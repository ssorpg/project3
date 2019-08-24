// COMPONENTS
import React from 'react';
import { ListGroup, ListGroupItem, Card, Row, Col } from 'react-bootstrap';

// FUNCTIONS
import GetProfileImage from '../utils/getprofileimage';

export default function ProfileInfo({ user }) {
  return (
    <div>
      <Card className="text-dark text-left col-12 card" style={{ maxWidth: 'calc( 100% - 30px )', margin: 'auto' }}>
        <Row>
          <Col className="col-md-2" style={{ maxWidth: '250px' }}>
            <img src={GetProfileImage(user)}
              style={{ minHeight: '150px', width: '100%', minWidth: '150px', padding: '15px' }}
              alt="profile"
            />
          </Col>
          <Col className="col-9">
            <header className="col-8" style={{ paddingTop: '20px' }}>
              <h2 className="card-title">{user.name}</h2>
            </header>
            <div className="card-body">
              <p className="card-text">
                <h5>Bio: </h5>{user.bio}
              </p>
              <p className="card-text">
                <h5>Location: </h5>{user.location}
              </p>
            </div>
          </Col>
        </Row>
        {
          user.communities ?
            <div className="networks" style={{ margin: '30px' }}>
              <h5 className="card-title">Your Networks</h5>
              <ListGroup>
                {
                  user.communities.map(community => (
                    <ListGroupItem>
                      <a
                        key={community.id}
                        href={`/community/${community.id}`}
                      >
                        {community.name}
                      </a>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            </div>
            : ''
        }
      </Card>
    </div>
  );
}
