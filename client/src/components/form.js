import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { LoginButton } from './buttons';
import { Button } from 'react-bootstrap';
import ax from 'axios';
import ImageUpload from './imageupload';

// LOGIN FORM 
// LOGIN FORM 
// LOGIN FORM 
export class LoginForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let formData = event.target;
    let inputs = formData.getElementsByTagName('input');
    let postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }

    this.login(postData);
  }

  login = async (postData) => {
    let res = await ax.post('/api/users', postData);

    if (res.status === 200) {
      window.location = `/profile/`;
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
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
      </div>
    )
  }

}


//REGISTER FORM
//REGISTER FORM
//REGISTER FORM
export class RegisterForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let formData = event.target;
    let inputs = formData.getElementsByTagName('input');
    let postData = {};

    for (let i = 0; i < inputs.length; i++) {
      postData[inputs[i].name] = inputs[i].value;
    }

    this.postToDB(postData);
  }

  postToDB = async (postData) => {
    console.log(postData);
    const {
      name, email, password, password_match
    } = postData;

    try {
      let register_results = await ax.post(
        '/api/users/register',
        {
          name: name,
          email: email,
          password: password,
        }
      );

      if (register_results.status === 200) {
        const logged = await this.login(
          postData.email,
          postData.password
        );
      }
    } catch (error) {
      console.log('Error :', error.response);
    }
  }

  login = async (email, pass) => {
    let res = await ax.post('/api/users', { email: email, password: pass });

    if (res.status === 200) {
      window.location = `/update-profile/`;
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
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
      </div>
    )
  }
}


//UPDATE FORM
//UPDATE FORM
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
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let formData = event.target;
    let inputs = formData.getElementsByTagName('input');
    let postData = {};

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
      let register_results = await ax.put(
        '/api/users/update',
        {
          bio: bio,
          location: location,
          id: this.state.userData.data.id
        }
      );

      if (register_results.status === 200) {
        window.location = `/create-community/`;
      }
    } catch (error) {
      console.log('Error :', error.response);
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
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
      // communities: [],
      // users: [],
      // events: []
    }
  }
  //TODO move search input to be hidden if not logged in
   componentDidMount() {
    //*make indexes of top level data to speed up search
    //*if no matches in this dataset start searching tables one by one
    //  this.getData();
  }

  // getData = async () => {
  //   try {
  //     console.log(this.state.searchQuery);
  //     let res = await
  //       ax.post(
  //         '/api/search',
  //         {search: this.state.searchQuery}
  //       );
  //     if (res.status === 200) {
  //       let {
  //         users,
  //         events,
  //         communities
  //       } = res.data;

  //       this.setState({
  //         'users': users,
  //         'events': events,
  //         'communities': communities
  //       }, () => console.log(this.state));
  //     }
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }

  handleInputChange = event => {
    this.setState({
      searchQuery: event.target.value
    });
  }
  //todo remove init data grab and let users troll entire db
  //todo maybe add paging to results
  handleSearchSubmit = event => {
    event.preventDefault();
    let query = {searchTerm: this.state.searchQuery}
    window.location = `/search/${query}`;
    // if (this.state.users.length > 0) {
    //   this.state.users.forEach(item => {
    //     console.log(item);
    //   })
    // } else {
    //   console.log('Nothing to Search');
    // }
  }

  search = async query => {
    try {
      let res = await ax.post('/api/search', query);
      console.log(res);

      if (res.status === 200) {
        this.setState({
          initData: res.data
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <Form
        inline
        onSubmit={this.handleSearchSubmit}
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