// COMPONENTS
import React from 'react';
import { ListGroup, ListGroupItem, Card, Row, Col } from 'react-bootstrap';
import ProfilePhoto from './profilephoto';

export default function ProfileInfo({ userData }) {
  return (
    <div>
      {
        userData ?
          <Card className="text-dark text-left col-12 card" style={{ maxWidth: 'calc( 100% - 30px )', margin: 'auto' }}>
            <Row>
              <Col className="col-md-2" style={{ maxWidth: '250px' }}>
                <ProfilePhoto id={userData.data.id} />
              </Col>
              <Col className="col-9">
                <header className="col-8" style={{ paddingTop: '20px' }}>
                  <h2 className="card-title">{userData.data.name}</h2>
                </header>
                <div className="card-body">
                  <p className="card-text">
                    <h5>Bio: </h5>{userData.data.bio}
                  </p>
                  <p className="card-text">
                    <h5>Location: </h5>{userData.data.location}
                  </p>
                </div>
              </Col>
            </Row>
            {
              userData.data.communities ?
                <div className="networks" style={{ margin: '30px' }}>
                  <h5 className="card-title">Your Networks</h5>
                  <ListGroup>
                    {
                      userData.data.communities.map(community => (
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
          : ''
      }
    </div>
  );
}
