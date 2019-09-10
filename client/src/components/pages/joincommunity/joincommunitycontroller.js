// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import SelectFromExisting from './selectfromexisting';
import NewCommunity from './newcommunity';
import Megatron from '../../megatron';

// FUNCTIONS
import ax from 'axios';
import Modal from '../../modal';
import PageLoadError from '../../../utils/pageloaderror';

export default class CreateCommunity extends Component {
  constructor() {
    super();

    this.state = {
      communities: [],
      selectFromExisting: true,
      selectedCommId: undefined,
      makePrivate: true,
      alert: undefined
    };
  };

  async componentDidMount() {
    this.getData();
  };

  getData = async () => {
    try {
      const res = await ax.get('/api/communities');

      this.setState({ communities: res.data });
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  handleFormChange = () => {
    this.setState({
      alert: undefined,
      selectFromExisting: !this.state.selectFromExisting // toggle
    });
  };

  handleMakePrivate = () => {
    this.setState({ makePrivate: !this.state.makePrivate });
  };
  
  handleCreateCommunitySubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const inputs = form.getElementsByTagName('input');
    
    const community = {
      name: inputs[0].value,
      bio: inputs[1].value,
      private: inputs[2].checked
    };

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.createCommunity(community);
    submit.style.visibility = 'visible';
  };

  createCommunity = async community => {
    this.setState({ alert: undefined });

    try {
      const newCommunity = await ax.post('/api/communities/create', community);

      window.location = `/community/${newCommunity.data.id}`;
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  handleRadioSelection = event => {
    this.setState({ selectedCommId: parseInt(event.target.value) });
  };

  handleChosenCommunitySubmit = async event => {
    event.preventDefault();
    this.setState({ alert: undefined });

    try {
      await ax.post(`/api/communities/${this.state.selectedCommId}/users`);

      window.location = `/community/${this.state.selectedCommId}`;
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  render() {
    return (
      <Container id="create-community-form" maxWidth="md">
        <Megatron
          heading="Join A Community"
          subheading="Select a community from the dropdown or fill in a name below to create your own!"
          image="/images/joincommunity.jpg"
          imagePosition="77% 5%"
          megaHeight="65vh"
          megaMaxHeight="380px"
        />
        {
          this.state.selectFromExisting ?
              <SelectFromExisting
                communities={this.state.communities}
                handleFormChange={this.handleFormChange}
                handleChosenCommunitySubmit={this.handleChosenCommunitySubmit}
                handleRadioSelection={this.handleRadioSelection}
                selectedCommId={this.state.selectedCommId}
              />
            : <NewCommunity
                handleCreateCommunitySubmit={this.handleCreateCommunitySubmit}
                handleFormChange={this.handleFormChange}
                makePrivate={this.state.makePrivate}
                handleMakePrivate={this.handleMakePrivate}
              />
        }
        {
          this.state.alert ?
            <Modal error={this.state.alert} />
            : ''
        }
      </Container>
    );
  };
}