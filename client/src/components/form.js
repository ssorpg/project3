// COMPONENTS
import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import LoginButton from './buttons';

// FUNCTIONS
import ax from 'axios';
//TODO CHANGE TO JUST RETURN ERROR OBJ
import CheckError from '../utils/checkerror';
import Modal from '../components/modal';

// LOGIN FORM
export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorAlert: undefined
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
    console.log(postData);
    this.login(postData);
  }

  login = async postData => {
    try {
      const res = await ax.post('/api/users', postData);
      console.log(res);
      if (res.status === 200) {
        window.location = `/profile`;
      }
      
    } catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" {...this.props} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" {...this.props} />
          </Form.Group>
          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <LoginButton />
          </span>
        </Form>

        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
          :
            ''
        }
      </div>
    )
  }

}

//REGISTER FORM
export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorAlert: undefined
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = event.target;
    const inputs = formData.getElementsByTagName('input');
    const postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }

    this.postToDB(postData);
  }

  postToDB = async (postData) => {
    console.log(postData);
    const {
      name, email, password
    } = postData;

    try {
      const register_results = await ax.post(
        '/api/users/register',
        {
          name: name,
          email: email,
          password: password,
        }
      );

      if (register_results.status === 200) {
        await this.login(
          postData.email,
          postData.password
        );
      }
    }
    catch (error) {
      console.log(error.response);
      this.setState({errorAlert: error.response.data });
    }
  }

  login = async (email, pass) => {
    const res = await ax.post('/api/users', { email: email, password: pass });

    if (res.status === 200) {
      window.location = `/update-profile/`;
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} style={{position: 'relative'}}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" {...this.props} />
          </Form.Group>
          <Form.Group controlId="formGroupText">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter Name" {...this.props} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" {...this.props} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="password_match" placeholder="Confirm Password" {...this.props} />
          </Form.Group>
          <LoginButton />
        </Form>
        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
            :
            ''
        }
      </div>
    )
  }
}

//UPDATE FORM
export class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
    };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/users/profile/`);
      await this.setState({ userData: userData });
      console.log(this.state.userData);
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = event.target;
    const inputs = formData.getElementsByTagName('input');
    const postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }

    this.postToDB(postData);
  }

  postToDB = async (postData) => {
    console.log(postData);
    const {
      bio, location
    } = postData;

    try {
      const register_results = await ax.put(
        '/api/users/update',
        {
          bio: bio,
          location: location,
          id: this.state.userData.data.id
        }
      );

      if (register_results.status === 200) {
        window.location = `/profile`;
      }
    }
    catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} style={{position: 'relative'}}>
          <Form.Group controlId="formGroupPhoto">
          </Form.Group>
          <Form.Group controlId="formGroupBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control type="text" name="bio" placeholder="Tell me about yourself!" required {...this.props} />
          </Form.Group>
          <Form.Group controlId="formGroupText">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" placeholder="Westwood, LA" required {...this.props} />
          </Form.Group>
          {/* <ImageUpload /> */}
          <LoginButton />
        </Form>
        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
          : 
          <Modal success={this.state.success} />
        }
      </div>
    )
  }
}

//SEARCH FORM
//TODO send to search results page after they get response
//TODO if no response stay on page and tell them to try again
export class SearchForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchQuery: ''
    }
  }
  //TODO move search input to be hidden if not logged in
  
  handleInputChange = event => {
    this.setState({
      searchQuery: event.target.value
    });
  }
  //todo remove init data grab and let users troll entire db
  //todo maybe add paging to results
  handleSearchSubmit = event => {
    event.preventDefault();
    window.location = `/search?q=${this.state.searchQuery}`;
  }

  render() {
    return (
      <Form
        inline
        onSubmit={this.handleSearchSubmit}
        style={{position: 'relative'}}
      >
        {/* // TODO make search route to handle searches */}
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          id="search-input"
          onChange={this.handleInputChange}
        />
        <Button
          variant="outline-success"
          type="Submit"
        >
          Search
        </Button>
      </Form>
    )
  }
}