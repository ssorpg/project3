import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from '../card.js';
import ax from 'axios';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      userId: parseInt(props.match.params.UserId)
    };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/users/profile/`);
      this.setState({ userData: userData });
    }
    catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <div>
        {
          this.state.userData ?
            <Card cardClass={"text-dark text-left col-12 card"}>

              <img className="card-img-top" src="http://place-hold.it/200" alt="" style={{ height: '200px', width: '200px', padding: '20px' }} />
              <div className="card-body">
                <header>
                  <h5 className="card-title">
                    {this.state.userData.data.name}
                  </h5>
                  <h6 className="card-subtitle">
                    {this.state.userData.data.name}
                  </h6>
                </header>
                <p className="card-text">
                  {this.state.userData.data.bio}
                </p>

                <div className="networks">
                  <h5 className="card-title">Your Networks</h5>
                  <ListGroup>
                    {
                      this.state.userData.data.communities.map((community, id) => (
                        <ListGroupItem>
                          <a key={id} href={"/community/" + community.id}>{community.name}</a>
                        </ListGroupItem>
                      ))
                    }
                  </ListGroup>
                </div>
              </div>
            </Card>
            : ''
        }
      </div>
    )
  }
}
