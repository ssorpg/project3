import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { TextField } from '@material-ui/core'
// const useStyles = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));

// const handleEvent = event => {
//   event.preventDefault();
//   const form = event.target.value;
//   console.log(event.target.value);
// }

export default class Status extends Component {
  constructor() {
    super();
    this.state = {
      status: undefined,
    }
  }

  handleStatusChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    console.log(this.state.status);
  }

  handleStatusSubmit = event => {
    event.preventDefault();
    console.log(event);
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleStatusSubmit}>
          <FormControl>
            <InputLabel htmlFor="input-with-icon-adornment">How are you feeling?</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              onChange={this.handleStatusChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
      </>
    )
  }
}