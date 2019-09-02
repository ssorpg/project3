// COMPONENTS
import React, { Component } from 'react';
import { Input, InputLabel, InputAdornment, FormControl } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

// FUNCTIONS
// import { makeStyles } from '@material-ui/core/styles';
import ax from 'axios';

// const useStyles = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));

export default class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.user.status,
    }
  }

  handleStatusChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleStatusSubmit = async event => {
    event.preventDefault();
    //console.log(event);
    const { status } = this.state;
    const postData = { status };

    await this.postStatus(postData);
    console.log(postData);
  }

  postStatus = async postData => {
    try {
      await ax.put('/api/users/update', postData);
    } catch(error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleStatusSubmit} style={{ margin: '10px' }}>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">How are you feeling?</InputLabel>
            <Input
              name="status"
              id="input-with-icon-adornment"
              onChange={this.handleStatusChange}
              autoFocus 
              required
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
        <p>Status: {this.state.status}</p>
      </>
    )
  }
}