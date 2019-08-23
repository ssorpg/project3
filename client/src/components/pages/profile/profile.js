// COMPONENTS
import React, { Component } from 'react';
import Card from '../../card.js';
import ProfileInfo from '../../profileinfo';
import PostDisplay from '../../postdisplay';
import { Paper, Container } from '@material-ui/core';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      posts: undefined
    };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/users/profile/`);

      this.setState({
        userData: userData,
        posts: userData.data.wallPosts
      });
    }
    catch (error) {
      CheckError(error);
    }
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Paper >
          {/* <Card className="text-dark text-left col-12 card" style={{ border: 'none' }}> */}
            <ProfileInfo
              userData={this.state.userData}
            />
            {
              this.state.posts ?
                <PostDisplay
                  posts={this.state.posts}
                />
                : ''
            }
          {/* </Card> */}
        </Paper>
      </Container>
    )
  }
}
