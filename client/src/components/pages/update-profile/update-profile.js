// COMPONENTS
import React, { Component } from 'react';
import Imageupload from './imageupload';
import { UpdateForm } from './updateform';
import Megatron from '../../megatron';
import { Grid, Container, Paper, Divider } from '@material-ui/core';

export default class UpdateProfile extends Component {
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
              <UpdateForm />
            </Grid>
            <Divider style={{marginTop: '30px'}}/>
            <Grid item style={{marginTop:'20px'}}>
              <h3>Update Photo</h3>
              <Imageupload />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  }
};