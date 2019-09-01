// COMPONENTS
import React, { Component } from 'react';
import { Grid, Container, Paper } from '@material-ui/core';
import Imageupload from './imageupload';
import UpdateForm from './updateform';
import Megatron from '../../megatron';
import Modal from '../../modal';

// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

export default class UpdateProfileController extends Component {
  constructor() {
    super();

    this.state = {
      bio: undefined,
      location: undefined,
      selectedFile: undefined,
      alert: undefined
    };
  };

  componentDidMount() {
    this.GetData();
    // console.log(this.state);
  };

  GetData = async () => {
    try {
      const userData = await ax.get('/api/users/profile/');

      const { bio, location } = userData.data;
      this.setState({
        bio: bio,
        location: location,
      });
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  handleBioLocChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(event.target.name, event.target.value);
  };

  handleBioLocSubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const { bio, location } = this.state;
    const postData = {
      bio: bio,
      location: location
    };

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.postBioLocToDB(postData);
    submit.style.visibility = 'visible';
  };

  postBioLocToDB = async postData => {
    this.setState({ alert: undefined });

    try {
      await ax.put('/api/users/update', postData);

      this.setState({ alert: { isError: false, message: 'Profile information updated.' } });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: { isError: true, message: error.response.data } });
    }
  };

  handlePicChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handlePicSubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const picData = new FormData(form);

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.postPicToDB(picData);
    submit.style.visibility = 'visible';
  };

  postPicToDB = async picData => {
    this.setState({ alert: undefined });

    try {
      await ax.post('/api/users/images', picData);

      this.setState({ alert: { isError: false, message: 'Profile picture updated.' } });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: { isError: true, error: error.response.data } });
    }
  };

  render() {
    return (
      <>
        <Container maxWidth="md">
          <Megatron
            heading="Profile Settings"
            subheading="Edit bio and profile picture"
            image="https://source.unsplash.com/random"
            imagePosition="50%"
            megaHeight='60vh'
            megaMaxHeight='320px!important'
          />
          {
            this.state.errorAlert ?
              <Modal error={this.state.errorAlert} />
              : ''
          }
          <Paper style={{padding:'24px'}}>
            <Grid container alignContent="center">
              <Grid item md={6} style={{ marginBottom: '20px' }}>
                <h3>Update Profile</h3>
                <UpdateForm
                  bio={this.state.bio}
                  location={this.state.location}
                  handleBioLocChange={this.handleBioLocChange}
                  handleBioLocSubmit={this.handleBioLocSubmit}
                />
              </Grid>
              <Grid item md={6}>
                <h3>Update Photo</h3>
                <Imageupload
                  handlePicChange={this.handlePicChange}
                  handlePicSubmit={this.handlePicSubmit}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </>
    )
  }
};