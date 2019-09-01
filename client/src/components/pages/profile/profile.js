// COMPONENTS
import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import ProfileInfo from '../../profileinfo';
import PostController from '../../posts/postcontroller';
import Megatron from '../../megatron';
import Modal from '../../modal';

// FUNCTIONS
import ax from 'axios';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      YourProfile: props.YourProfile,
      status: props.YourProfile.status,
      posts: props.YourProfile.posts,
      inviteUserDialog: false,
      dialogAlert: undefined,
      inviteCommId: undefined,
      alert: undefined
    };
  };

  componentDidMount() {
    console.log(this.state);
  };

  removeCommunity = async event => {
    this.setState({ alert: undefined });

    const commInfo = event.target.dataset.id ? // sometimes the child element receives the event
      event.target.dataset
      : event.target.parentNode.dataset;

    const URL = commInfo.isfounder ?
      `/api/communities/${commInfo.id}` // delete comm
      : `/api/communities/${commInfo.id}/users` // leave comm

    try {
      const removedComm = await ax.delete(URL);

      const newProfile = this.state.YourProfile;
      newProfile.communities = newProfile.communities.filter(comm => { return comm.id !== removedComm.data.id; });
      this.setState({ YourProfile: newProfile });
    }
    catch (error) {
      console.log(error);
      this.setState({ alert: error.response.data });
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
    this.setState({ dialogAlert: undefined });

    try {
      await ax.post(`/api/communities/${this.state.inviteCommId}/invited`, invite);
      form.reset();
    }
    catch (error) {
      console.log(error);
      this.setState({ dialogAlert: error.response.data });
    }
  };

  handleInvite = async event => {
    this.setState({ alert: undefined });

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

          const newProfile = this.state.YourProfile;
          newProfile.invites = newProfile.invites.filter(invite => { return invite.id !== removedInvite.data.id; });
          this.setState({ YourProfile: newProfile });
          break;
        default:
          console.log('something bad happened');
      }
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
          image="https://source.unsplash.com/random"
          imagePosition="50%"
          megaHeight='20vh'
          megaMaxHeight='320px!important'
        />
        {
          this.state.YourProfile ?
            <>
              <ProfileInfo
                user={this.state.YourProfile} // used one component deep
                openInviteDialog={this.openInviteDialog}
                removeCommunity={this.removeCommunity}
                handleInvite={this.handleInvite}

                handleInviteUser={this.handleInviteUser} // used two components deep
                dialogAlert={this.state.dialogAlert}
                inviteUserDialog={this.state.inviteUserDialog}
                closeInviteDialog={this.closeInviteDialog}
              />
            </>
            : ''
        }
        {
          this.state.alert ?
            <Modal error={this.state.alert} />
            : ''
        }
        {
          this.state.posts ?
            <PostController
              {...this.props}
              posts={this.state.posts}
              cantPost={true}
            />
            : ''
        }
      </Container>
    );
  };
}
