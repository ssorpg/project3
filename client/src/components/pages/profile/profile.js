// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import ProfileInfo from '../../profileinfo/profileinfo';
import PostController from '../../posts/postcontroller';
import Megatron from '../../megatron';
import Modal from '../../modal';

// FUNCTIONS
import ax from 'axios';
import ExtractProfileImage from '../../../utils/extractprofileimage';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      YourProfile: props.YourProfile,
      posts: props.YourProfile.posts,
      inviteUserDialog: false,
      dialogAlert: undefined,
      inviteCommId: undefined,
      alert: undefined
    };
  };

  removeCommunity = async (CommunityId, isFounder) => {
    this.setState({ alert: undefined });

    const URL = isFounder ?
      `/api/communities/${CommunityId}` // delete comm
      : `/api/communities/${CommunityId}/users` // leave comm

    try {
      const removedComm = await ax.delete(URL);

      const newComms = this.state.YourProfile.communities.filter(comm => { return comm.id !== removedComm.data.id; });
      const newProfile = this.state.YourProfile;
      newProfile.communities = newComms;
      this.setState({ YourProfile: newProfile });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  openInviteDialog = CommunityId => {
    this.setState({
      inviteUserDialog: true,
      inviteCommId: CommunityId
    });
  };

  closeInviteDialog = () => {
    this.setState({
      inviteUserDialog: false,
      inviteCommId: undefined
    });
  };

  handleInviteUser = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('input')[0];

    const invite = {
      email: input.value
    };

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.inviteUser(form, invite);
    submit.style.visibility = 'visible';
  };

  inviteUser = async (form, invite) => {
    this.setState({ dialogAlert: undefined });

    try {
      await ax.post(`/api/communities/${this.state.inviteCommId}/invited`, invite);
      form.reset();
      this.setState({ dialogAlert: { success: true, message: `Invited ${invite.email} to your community.` } });
    }
    catch (error) {
      console.log(error);
      this.setState({ dialogAlert: { success: false, message: error.response.data } });
    }
  };

  handleAcceptInvite = async CommunityId => {
    this.setState({ alert: undefined });

    try {
      await ax.post(`/api/communities/${CommunityId}/users`);

      window.location = `/community/${CommunityId}`;
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  handleDeclineInvite = async CommunityId => {
    this.setState({ alert: undefined });

    try {
      const removedInvite = await ax.delete(`/api/communities/${CommunityId}/invited`);

      const newInvites = this.state.YourProfile.invites.filter(invite => { return invite.id !== removedInvite.data.id; });
      const newProfile = this.state.YourProfile;
      newProfile.invites = newInvites;
      this.setState({ YourProfile: newProfile });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  handleStatusSubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('input')[0];

    const status = {
      status: input.value
    };

    await this.postStatus(form, status);
  };

  postStatus = async (form, status) => {
    this.setState({ alert: undefined });

    try {
      await ax.put('/api/users/update', status);

      const newProfile = this.state.YourProfile;
      newProfile.status = status.status;
      this.setState({ YourProfile: newProfile });

      form.reset();
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
    }
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Megatron
          heading="Profile"
          image={ExtractProfileImage(this.state.YourProfile)} // for some reason the megatron doesn't show nophoto.png?
          imagePosition="50%"
          megaHeight='20vh'
          megaMaxHeight='320px!important'
        />
        <ProfileInfo
          {...this.props} // used one component deep
          user={this.state.YourProfile}
          openInviteDialog={this.openInviteDialog}
          removeCommunity={this.removeCommunity}
          handleAcceptInvite={this.handleAcceptInvite}
          handleDeclineInvite={this.handleDeclineInvite}

          handleInviteUser={this.handleInviteUser} // used two components deep
          dialogAlert={this.state.dialogAlert}
          inviteUserDialog={this.state.inviteUserDialog}
          closeInviteDialog={this.closeInviteDialog}

          handleStatusSubmit={this.handleStatusSubmit} // used three components deep
        />
        {
          this.state.alert ?
            <Modal error={this.state.alert} />
            : ''
        }
        <PostController
          {...this.props}
          posts={this.state.posts}
          postURL={`/api/posts?UserId=${this.state.YourProfile.id}`}
          cantPost={true}
        />
      </Container>
    );
  };
}
