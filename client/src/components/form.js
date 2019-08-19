import React, { Component } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { LoginButton, Register } from './buttons';
import ax from 'axios';


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
                    <LoginButton />
                    <Register />
                </Form>
            </div>
        )
    }

}

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
        name, email, password,
        password_match, photo,
        community_name} = postData;

        try {
            let register_results = await ax.post(
              '/api/users/register',
              {
                name: name,
                email: email,
                password: password,
                photo: photo
              }  
            );
            
            if (register_results.status === 200) {
                const logged = await this.login(
                  postData.email,
                  postData.password
                );
                if(logged) {
                  let community_results = await ax.post('/api/communities', {name: community_name});
                  if(community_results.status === 200) {
                    //todo add a cookie for community
                    this.redirectToCommunityPage(community_results);
                  }
                }
            }
        } catch (error) {
            console.log('Error :', error.response);
        }
    }

    login = async (email, pass) => {
        let res = await ax.post('/api/users', { email: email, password: pass });

        if (res.status === 200) {
            // window.location = `/profile/`;
            return true;
        }
    }

    redirectToCommunityPage = (commId) => {
      window.location = `/community/${commId.data.id}`;
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
                    <Form.Group>
                        <Form.Label>Upload Profile Photo</Form.Label>
                        <Form.Control type="file" name="photo" placeholder="Image" {...this.props} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Create A Community for You and Your People</Form.Label>
                      <Form.Control type="text" name="community_name" />
                    </Form.Group>
                    <Form.Group controlId="formGroupText">
                        <Form.Label>Choose Community</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Community List
                        </Dropdown.Toggle>

                            <Dropdown.Menu name="community">
                                <Dropdown.Item href="#/action-1">The Jackson Family</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Walmart 7301</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Meme-a-holics 101</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <LoginButton />
                </Form>
            </div>
        )
    }
}
