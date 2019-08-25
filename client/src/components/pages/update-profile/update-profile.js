// COMPONENTS
import React, { Component } from 'react';
import Imageupload from './imageupload';
import UpdateForm from './updateform';
import Megatron from '../../megatron';
import { Grid, Container, Paper, Divider } from '@material-ui/core';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class UpdateProfile extends Component {
  constructor() {
    super();

    this.state = {
      bio: undefined,
      location: undefined,
      description: undefined,
      selectedFile: undefined,
      errorAlert: undefined
    };
  }

  componentDidMount() {
    this.GetData();
    // console.log(this.state);
  }

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/users/profile/`);
      this.setState({
        bio: userData.data.bio,
        location: userData.data.location,
      });
    }
    catch (error) {
      CheckError(error);
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const formData = event.target;
    const inputs = formData.getElementsByTagName('input');
    const postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }

    this.postToDB(postData);
  }

  postToDB = async postData => {
    this.setState({ errorAlert: undefined });

    console.log(postData);
    const { bio, location } = postData;

    try {
      await ax.put('/api/users/update', {
        bio: bio,
        location: location
      });

      window.location = `/profile`;
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name, event.target.value);
  }

  onSubmit = async event => {
    this.setState({ errorAlert: undefined })

    try {
      event.preventDefault();

      const { description, selectedFile } = this.state;
      const formData = new FormData();

      formData.append('description', description);
      formData.append('selectedFile', selectedFile);

      const res = await ax.post(`/api/images`, formData)

      console.log(res);

      window.location = '/profile';
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <Container maxWidth="md">
        <Paper />
        <Grid container maxWidth="md">
          <Megatron
            heading="Profile Settings"
            subheading="Edit bio and profile picture"
            image="https://source.unsplash.com/random"
            imagePosition="77% 5%"
            megaHeight='60vh'
            megaMaxHeight='620px!important'
          />
          <Grid item className="col-6">
            <Grid item>
              <h3>Update Profile</h3>
              <UpdateForm
                bio={this.state.bio}
                location={this.state.location}
                onChange={this.onChange}
                handleSubmit={this.handleSubmit}
                errorAlert={this.state.errorAlert}
              />
            </Grid>
            <Divider style={{ marginTop: '30px' }} />
            <Grid item style={{ marginTop: '20px' }}>
              <h3>Update Photo</h3>
              <Imageupload
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                errorAlert={this.state.errorAlert}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  }
};