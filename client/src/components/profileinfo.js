// COMPONENTS
import React from 'react';
import { ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import ProfilePhoto from './profilephoto';

export default function ProfileInfo({ userData }) {
  return (
    <div>
      {
        userData
          ? <Card className="text-dark text-left col-12 card" style={{ margin:'15px' }}>
            <div className="row justify-content-start">
              <ProfilePhoto id={userData.data.id} size={'250px'} />
              <header className="col-8" style={{ paddingTop: '20px' }}>
                <h5 className="card-title">{userData.data.name}</h5>
              </header>
            </div>
            <div className="card-body">
              <p className="card-text">
                <h5>Bio:</h5> {userData.data.bio}
              </p>
              <p className="card-text">
                <h5>Location:</h5> {userData.data.location}
              </p>

              {
                userData.data.communities
                  ? <div className="networks">
                    <h5 className="card-title">Your Networks</h5>
                    <ListGroup>
                      {
                        userData.data.communities.map(community => (
                          <ListGroupItem>
                            <a key={community.id} href={"/community/" + community.id}>{community.name}</a>
                          </ListGroupItem>
                        ))
                      }
                    </ListGroup>
                  </div>
                  : ''
              }
            </div>
          </Card>
          : ''
      }
    </div>
  );
}
