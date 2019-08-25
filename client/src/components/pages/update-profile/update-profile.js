// COMPONENTS
import React, { Component } from 'react';
import Imageupload from './imageupload';
import { UpdateForm } from './updateform';
import Megatron from '../../megatron';
import { Grid, Container } from '@material-ui/core';

export default class UpdateProfile extends Component {
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
          {/* <Paper> */}
          <Grid container alignContent="center">
            <Grid item md={6} style={{marginBottom:'20px'}}>
              <h3>Update Profile</h3>
              <UpdateForm id={this.props.id} />
            </Grid>
            <Grid item md={6}>
              <h3>Update Photo</h3>
              <Imageupload id={this.props.id} />
            </Grid>
          </Grid>
          {/* </Paper> */}
        </Container>
      </>
    )
  }
};