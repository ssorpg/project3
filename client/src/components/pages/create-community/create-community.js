// COMPONENTS
import React, { Component } from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';
import SelectFromExisting from './selectfromexisting';
import NewCommunity from './newcommunity';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';
import Modal from '../../modal';

export default class CreateCommunity extends Component {
  constructor() {
    super();
    this.state = {
      communities: [],
      selectFromExisting: false,
      toggleButtonClassName: 'btn btn-success d-none',
      CommunityId: undefined
    }
  }

  async componentDidMount() {
    const res = await ax.get('/api/communities');

    if (res.data.length > 0) {
      this.setState({
        communities: res.data,
        selectFromExisting: true,
        toggleButtonClassName: 'btn btn-success'
      });
    }
  }

  handleFormChange = () => {
    let stateBoolean = this.state.selectFromExisting === true ? false : true;

    this.setState({
      selectFromExisting: stateBoolean
    });
  }

  handleRadioSelection = event => {
    this.setState({
      CommunityId: event.target.getAttribute('data-id')
    })
  }

  handleChosenCommunitySubmit = async event => {
    event.preventDefault();

    try {
      const res = await ax.post(`/api/communities/${this.state.CommunityId}/users`)

      if (res.status === 200) {
        window.location = `/community/${this.state.CommunityId}`;
      }
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  handleCreateCommunitySubmit = event => {
    event.preventDefault();
    const form = event.target;
    const input = form.getElementsByTagName('input')[0];
    const value = input.value;
    this.createCommunity({ name: value });
  }

  createCommunity = async community => {
    try {
      const results = await ax.post('/api/communities', community);

      let CommunityId = results.data.id;
      window.location = `/community/${CommunityId}`;
    }
    catch (error) {
      CheckError(error);
    }
  }

  render() {
    return (
      <Container id="create-community-form">
        <Jumbotron>
          <h1>Create A Community</h1>
          <p>Select a community from the dropdown or fill in a name below to create your own!</p>
        </Jumbotron>
        <Row style={{position: 'relative'}}>
          {
            this.state.selectFromExisting
              ? <SelectFromExisting
                communities={this.state.communities}
                handleChosenCommunitySubmit={this.handleChosenCommunitySubmit}
                handleRadioSelection={this.handleRadioSelection}
                handleFormChange={this.handleFormChange}
              />
              : <NewCommunity
                handleCreateCommunitySubmit={this.handleCreateCommunitySubmit}
                toggleButtonClassName={this.toggleButtonClassName}
                handleFormChange={this.handleFormChange}
              />
          }
          {
            this.state.errorAlert ?
              <Modal error={this.state.errorAlert} />
            :
              ''
          }
          {
            this.state.successAlert ?
              <Modal error={this.state.successAlert} />
            :
              ''
          }
        </Row>

      </Container>
    )
  }
}