// COMPONENTS
import React, { Component } from 'react';
import Modal from '../../modal';
import TextField from '@material-ui/core/TextField';
// import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

// FUNCTIONS
import ax from 'axios';

export class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      errorAlert: undefined
    };
  }

  componentDidMount() {
    this.GetData();
    // console.log(this.state);
  }

  GetData = async () => {
    this.setState({ errorAlert: undefined });

    try {
      const userData = await ax.get(`/api/users/profile/`);
      this.setState({ userData: userData });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  };

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
      await ax.put('/api/users/update',
        {
          bio: bio,
          location: location,
          id: this.state.userData.data.id
        });

      window.location = `/profile`;
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
            : <Modal success={this.state.success} />
        }
        <form onSubmit={this.handleSubmit} style={{ position: 'relative' }}>
          <TextField
            id="outlined-multiline-flexible"
            label="Bio"
            rowsMax="6"
            margin="normal"
            helperText="Tell me about yourself! What are your goals?! Hobbies?!"
            variant="outlined"
            name="bio"
            required
          />
          <TextField
            id="outlined-name"
            label="Location"
            margin="normal"
            helperText="Where do you live?"
            variant="outlined"
            name="location"
            required
          /><br/>
          {/* <LoginButton /> */}
          <Button variant="contained" color="primary" size="small" type="submit">
            <SaveIcon  />
            Save
      </Button>
        </form>
      </div>
    )
  }
}