// COMPONENTS
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Drawer, List, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import Searchbar from './searchbar';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

const useStyles = makeStyles(theme => ({
  minDrawerWidth: {
    minWidth: '250px'
  },

  navZIndex: {
    position: 'fixed',
    zIndex: '999'
  },

  max1280: {
    width: '100%',
    maxWidth: '1280px',
    margin: 'auto'
  },

  leftButtonMargin: {
    marginRight: '10px'
  },

  navTitle: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },

  navTitleText: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      color: '#d3d3d3',
      textDecoration: 'none'
    }
  },

  fillWidth: {
    flexGrow: 1
  },

  logout: {
    color: '#f00'
  },
}));

export default function Navbar(props) {
  const { YourProfile, CommunityId } = props;

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  async function logout() {
    try {
      await ax.get('/api/users/logout');

      window.location = '/';
    }
    catch (error) {
      PageLoadError(error);
    }
  };

  const leftSide = side => (
    <div
      className={classes.minDrawerWidth}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <a href="/profile" className="reset-a"><MenuItem><ListItemText primary={'Your Profile'} /></MenuItem></a>
        { // this is just ugly from lines 98 to 113 - TODO make this not gross to look at
          CommunityId ?
            YourProfile.communities.map(community => {
              return (CommunityId === community.id ?
                <span key={community.id}>
                  <a href={`/community/${community.id}`} className="reset-a"><MenuItem><ListItemText primary={`${community.name} Feed`} /></MenuItem></a>
                  <a href={`/community/${community.id}/friends`} className="reset-a"><MenuItem><ListItemText primary={`${community.name} Friends`} /></MenuItem></a>
                  <a href={`/community/${community.id}/events`} className="reset-a"><MenuItem><ListItemText primary={`${community.name} Events`} /></MenuItem></a>
                  {/* <a href={`/community/${community.id}/chat`} className="reset-a"><MenuItem><ListItemText primary={`${community.name} Chat`} /></MenuItem></a> */}
                </span>
                : '')
            })
            : YourProfile.communities.map(community => {
              return (<a key={community.id} href={`/community/${community.id}`} className="reset-a"><MenuItem><ListItemText primary={`${community.name} Feed`} /></MenuItem></a>);
            })
        }
        <a href="/chat" className="reset-a"><MenuItem>Global Chat</MenuItem></a>
      </List>
    </div>
  );

  const rightSide = side => (
    <div
      className={classes.minDrawerWidth}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {/* <a href="/profile" className="reset-a"><MenuItem><ListItemText primary={'Your Profile'} /></MenuItem></a> */}
        <a href="/updateprofile" className="reset-a"><MenuItem><ListItemText primary={'Update Profile'} /></MenuItem></a>
        <a href="/joincommunity" className="reset-a"><MenuItem><ListItemText primary={'Join/Create Community'} /></MenuItem></a>
        <span className={classes.logout}><MenuItem onClick={logout}><ListItemText primary={'Logout'} /></MenuItem></span>
        {/* <a href="/chat" className="reset-a"><MenuItem><ListItemText primary={'Global Chat'} /></MenuItem></a> */}
      </List>
    </div>
  );

  return (
    <div className={classes.navZIndex}>
      <AppBar>
        <Toolbar className={classes.max1280}>
          <IconButton
            edge="start"
            aria-label="open drawer"
            aria-haspopup="true"
            onClick={toggleDrawer('left', true)}
            className={classes.leftButtonMargin}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.navTitle} variant="h6" noWrap>
            <a href="/" className={classes.navTitleText}>
              The Private Network
            </a>
          </Typography>
          <div className={classes.fillWidth} />
          <Searchbar />
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={toggleDrawer('right', true)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {leftSide('left')}
      </Drawer>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {rightSide('right')}
      </Drawer>
    </div>
  );
}
