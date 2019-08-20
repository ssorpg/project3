import React, { Component } from 'react';
import axios from 'axios';
import Success from './success';
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
      await this.setState({ userData: userData });
    }
    catch (error) {
      CheckError(error);
    }
  };

  componentDidMount() {
    this.GetData();
  };

  onChange = e => {
    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
        break;
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { description, selectedFile } = this.state;
    let formData = new FormData();
    let userid = this.state.userData.data.id;
    formData.append('description', description);
    formData.append('selectedFile', selectedFile);

    axios.post(`/api/${userid}/images`, formData)
      .then(result => {
        console.log(result);
        //this is an alert for now, will swap it out with some cool popup thingie from material-ui when we switch to it.
        alert('s u c c e s s');
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
          type="file"
          name="selectedFile"
          onChange={this.onChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}