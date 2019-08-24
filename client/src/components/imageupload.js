// COMPONENTS
import React, { Component } from 'react';
import SubmitButton from './buttons';

// FUNCTIONS
import axios from 'axios';
// import Success from './success';
import CheckError from '../utils/checkerror';

export default class ImageUpload extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      selectedFile: '',
      userData: undefined
    };
  }

  GetData = async () => {
    try {
      const userData = await axios.get(`/api/users/profile/`);
      
      this.setState({ userData: userData });
    }
    catch (error) {
      CheckError(error);
    }
  };

  componentDidMount() {
    this.GetData();
  };

  onChange = event => {
    switch (event.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: event.target.files[0] });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
        break;
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const { description, selectedFile } = this.state;
    const formData = new FormData();
    formData.append('description', description);
    formData.append('selectedFile', selectedFile);

    axios.post(`/api/images`, formData)
      .then(result => {
        console.log(result);
        //this is an alert for now, will swap it out with some cool popup thingie from material-ui when we switch to it.
        window.location = '/profile';
      });
  }

  render() {
    const { description/* , selectedFile */ } = this.state; // just so we don't get react warns
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="description"
          value={description}
          onChange={this.onChange}
        />
        <input
          style={{ marginLeft: '4px', padding: '2px' }}
          type="file"
          name="selectedFile"
          onChange={this.onChange}
        />
        <SubmitButton />
      </form>
    );
  }
}