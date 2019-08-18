import React, { Component, useState } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from '../card.js';
import ax from 'axios';
import ImageUpload from '../imageupload';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      userId: parseInt(props.match.params.UserId)
    };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    try {
      var results = await ax.get(`/api/users/profile/`);
      this.setState({userData: results});
    } catch (error) {
      console.log('Error :', error, '\n');
    }
  }

  render() {
    return (
      <div>
        {this.state.userData.data !== undefined ?
          <Card cardClass={
            "text-dark text-left col-12 card"
          }>

            <img className="card-img-top" src="http://place-hold.it/200" alt="Card image cap" style={{ height: '200px', width: '200px', padding: '20px' }} />
            <div class="card-body">
              <header>
                <h5 class="card-title">
                  {this.state.userData.data.name}
                </h5>
                <h6 class="card-subtitle">
                  {this.state.userData.data.name}
                </h6>
              </header>
              <p class="card-text">
                {this.state.userData.data.bio}
              </p>

              <div className="networks">
                <h5 class="card-title">Your Networks</h5>
                {this.state.userData.data.communities.length > 0 ?
                  <ListGroup>

                    {this.state.userData.
                      data.communities.map(item => (
                        <ListGroupItem>
                          <a href="#">{item}</a>
                        </ListGroupItem>
                      ))
                    }
                  </ListGroup>
                  :
                  ''
                }
              </div>
            </div>
          </Card>
          :
          ""
        }
      </div>
    )
  }
}

export default Profile;