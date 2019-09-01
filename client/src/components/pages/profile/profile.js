// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import ProfileInfo from '../../profileinfo';
import PostController from '../../posts/postcontroller';
import Megatron from '../../megatron';
import Modal from '../../modal';

// FUNCTIONS
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: undefined,
      posts: undefined,
      errorAlert: undefined,
      dialogErrorAlert: undefined,
      inviteUserDialog: false,
      inviteCommId: undefined
    };
  };

  componentDidMount() {
    this.GetData();
  };

  GetData = async () => {
    try {
      const userData = await ax.get('/api/users/profile/');

      this.setState({
        userData: userData.data,
        posts: userData.data.posts
      });
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  removeCommunity = async event => {
    this.setState({ errorAlert: undefined });

    const commInfo = event.target.dataset.id ? // sometimes the child element receives the event
      event.target.dataset
      : event.target.parentNode.dataset;

    const URL = commInfo.isfounder ?
      `/api/communities/${commInfo.id}` // delete comm
      : `/api/communities/${commInfo.id}/users` // leave comm

    try {
      const removedComm = await ax.delete(URL);

      const newUserData = this.state.userData;
      newUserData.communities = newUserData.communities.filter(comm => { return comm.id !== removedComm.data.id; });
      this.setState({ userData: newUserData });
    }
    catch (error) {
      console.log(error);
      this.setState({ errorAlert: error.response.data });
    }
  };

  openInviteDialog = event => {
    const commInfo = event.target.dataset.id ?
      event.target.dataset
      : event.target.parentNode.dataset;

    this.setState({
      inviteUserDialog: true,
      inviteCommId: commInfo.id
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
    await this.postToDB(form, invite);
    submit.style.visibility = 'visible';
  };

  postToDB = async (form, invite) => {
    this.setState({ dialogErrorAlert: undefined });

    try {
      await ax.post(`/api/communities/${this.state.inviteCommId}/invited`, invite);
      form.reset();
    }
    catch (error) {
      console.log(error);
      this.setState({ dialogErrorAlert: error.response.data });
    }
  };

  handleInvite = async event => {
    this.setState({ errorAlert: undefined });

    const commInfo = event.target.dataset.id ?
      event.target.dataset
      : event.target.parentNode.dataset;

    try {
      switch (commInfo.action) {
        case 'accept':
          await ax.post(`/api/communities/${commInfo.id}/users`);
          window.location = `/community/${commInfo.id}`;
          break;
        case 'decline':
          const removedInvite = await ax.delete(`/api/communities/${commInfo.id}/invited`);

          const newUserData = this.state.userData;
          newUserData.invites = newUserData.invites.filter(invite => { return invite.id !== removedInvite.data.id; });
          this.setState({ userData: newUserData });
          break;
        default:
          console.log('something bad happened');
      }
    }
    catch (error) {
      console.log(error);
      this.setState({ errorAlert: error.response.data });
    }
  };

  render() {
    return (
      <Container maxWidth="lg">
        <Megatron
          heading="Profile"
          image="https://source.unsplash.com/random"
          imagePosition="50%"
          megaHeight='20vh'
          megaMaxHeight='320px!important'
        />
        {
          this.state.userData ?
            <>
              <ProfileInfo
                user={this.state.userData}
                handleInviteUser={this.handleInviteUser}
                inviteUserDialog={this.state.inviteUserDialog}
                dialogErrorAlert={this.state.dialogErrorAlert}
                openInviteDialog={this.openInviteDialog}
                closeInviteDialog={this.closeInviteDialog}
                removeCommunity={this.removeCommunity}
                handleInvite={this.handleInvite}
              />
            </>
            : ''
        }
        {
          this.state.errorAlert ?
            <Modal error={this.state.errorAlert} />
            : ''
        }
        {
          this.state.posts ?
            <PostController
              posts={this.state.posts}
              cantPost={true}
            />
            : ''
        }
      </Container>
    );
  };
}
