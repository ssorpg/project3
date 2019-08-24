// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import SelectFromExisting from './selectfromexisting';
import NewCommunity from './newcommunity';
import Megatron from '../../megatron';

// FUNCTIONS
import ax from 'axios';
import Modal from '../../modal';

export default class CreateCommunity extends Component {
  constructor() {
    super();

    this.state = {
      communities: undefined,
      selectFromExisting: false,
      toggleButtonClassName: 'btn btn-success d-none',
      CommunityId: undefined,
      errorAlert: undefined
    }
  }

  async componentDidMount() {
    const res = await ax.get(`/api/communities`);

    this.setState({
      communities: res.data,
    });
  }

  handleFormChange = () => {
    this.setState({
      selectFromExisting: !this.state.selectFromExisting // toggle
    });
  }

  handleRadioSelection = event => {
    this.setState({
      CommunityId: parseInt(event.target.value)
    });
  }

  handleChosenCommunitySubmit = async event => {
    event.preventDefault();
    this.setState({ errorAlert: undefined });

    try {
      await ax.post(`/api/communities/${this.state.CommunityId}/users`)

      window.location = `/community/${this.state.CommunityId}`;
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  handleCreateCommunitySubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('input')[0];
    const name = input.value;

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.createCommunity({ name: name });
    submit.style.visibility = 'visible';
  }

  handleFormReset = event => {
    console.log(event.target);
    event.target.reset();
  }

  createCommunity = async community => {
    this.setState({ errorAlert: undefined });

    try {
      const newCommunity = await ax.post(`/api/communities`, community);

      window.location = `/community/${newCommunity.data.id}`;
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <Container id="create-community-form" maxWidth="md">
        <Megatron
          heading="Create A Community"
          subheading="Select a community from the dropdown or fill in a name below to create
            your own!"
          image="https://picsum.photos/id/469/1000/1100"
          imagePosition="77% 5%"
        />

        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
            : ''
        }

        {
          this.state.selectFromExisting ?
              <SelectFromExisting
                communities={this.state.communities}
                CommunityId={this.state.CommunityId}
                handleChosenCommunitySubmit={this.handleChosenCommunitySubmit}
                handleRadioSelection={this.handleRadioSelection}
                handleFormChange={this.handleFormChange}
                handleFormReset={this.handleFormReset}
              />
            :
              <NewCommunity
                handleCreateCommunitySubmit={this.handleCreateCommunitySubmit}
                toggleButtonClassName={this.toggleButtonClassName}
                handleFormChange={this.handleFormChange}
              />
        }
      </Container>
    )
  }
}