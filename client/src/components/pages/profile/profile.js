// COMPONENTS
import React, { Component } from 'react';
import Card from '../../card.js';
import ProfileInfo from '../../profileinfo';
import PostDisplay from '../../postdisplay';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: undefined,
      posts: undefined,
      errorAlert: undefined
    };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/users/profile/`);

      await this.setState({
        userData: userData,
        posts: userData.data.wallPosts
      });

      console.log('profile', this.state.userData);
    }
    catch (error) {
      CheckError(error);
    }
  }

  render() {
    return (
      <div>
        <Card className="text-dark text-left col-12 card" style={{ border: 'none' }}>
          <ProfileInfo
            userData={this.state.userData}
          />
          <PostDisplay
            posts={this.state.posts}
          />
        </Card>
      </div>
    )
  }
}
