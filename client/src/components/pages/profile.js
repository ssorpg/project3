import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from '../card.js';
import ax from 'axios';
import ImageUpload from '../imageupload';
import CheckError from '../../utils/checkerror';

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

      await this.setState({ userData: userData });
      console.log('profile', this.state.userData);
    }
    catch (error) {
      CheckError(error);
    }
  }

  render() {
    return (
      <div>
        {
          this.state.userData ?
            <Card cardClass={"text-dark text-left col-12 card"}>
              <div className="row justify-content-start">
                <img className="card-img-top col-2" src="http://place-hold.it/200" alt="" style={{ height: '200px', minWidth: '200px', padding: '20px' }} />
                <header className="col-5" style={{ paddingTop: '20px' }}>
                  <h5 className="card-title">
                    {this.state.userData.data.name}
                  </h5>
                </header>
              </div>
              <div className="card-body">
                <p className="card-text">
                  {this.state.userData.data.bio}
                </p>

                <div className="networks">
                  <h5 className="card-title">Your Networks</h5>
                  <ListGroup>
                    {
                      this.state.userData.data.communities.map((community, id) => (
                        <ListGroupItem>
                          <a key={id.toString()} href={"/community/" + community.id}>{community.name}</a>
                        </ListGroupItem>
                      ))
                    }
                  </ListGroup>
                </div>
              </div>
            </Card>
            : ''
        }
        <ImageUpload />
      </div>
    )
  }
}
