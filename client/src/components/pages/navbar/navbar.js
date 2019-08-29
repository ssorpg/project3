// COMPONENTS
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import Searchbar from './searchbar';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import ax from 'axios';
import PageLoadError from '../../../utils/pageloaderror';

const useStyles = makeStyles(theme => ({
  scrollNav: {
    position: 'fixed',
    zIndex: '99'
  },

  grow: {
    flexGrow: 1
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },

  title: {
    display: 'none',
    color: '#fff',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },

  linkStyleReset: {
    color: 'initial',
    '&:hover': {
      color: 'initial',
      textDecoration: 'none'
    }
  },

  logout: {
    color: '#f00'
  }
}));

export default function PrimarySearchAppBar({ isAuth, CommunityId }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sidebarAnchorEl, setSidebarAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isSidebarMenuOpen = Boolean(sidebarAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuOpen(event) {
    setSidebarAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    setSidebarAnchorEl(null);
  }

  async function logout() {
    try {
      await ax.get('/api/users/logout');

      window.location = '/';
    }
    catch (error) {
      PageLoadError(error);
    }
  }

  const accountMenuId = 'primary-search-account-menu';
  const renderAccountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={accountMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <a href="/profile" className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Profile</MenuItem></a> */}
      <a href="/update-profile" className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem></a>
      <a href="/create-community" className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Join/Create Community</MenuItem></a>
      <MenuItem className={classes.logout} onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const menuId = 'primary-search-menu';
  const renderMenu = (
    <Menu
      anchorEl={sidebarAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isSidebarMenuOpen}
      onClose={handleMenuClose}
    >
      <a href="/profile" className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Profile</MenuItem></a>
      {
        CommunityId ?
          <>
            <a href={`/community/${CommunityId}`} className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Community Feed</MenuItem></a>
            <a href={`/community/${CommunityId}/friends`} className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Community Friends</MenuItem></a>
            {/* <a href={`/community/${CommunityId}/chat`} className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Chat</MenuItem></a> */}
          </>
          : ''
      }
      <a href={`/chat`} className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Chat</MenuItem></a>
    </Menu>
  );

  return (
    <div className={classes.scrollNav}>
      {
        isAuth ?
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                aria-label="open drawer"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                className={classes.menuButton}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                The Private Network
              </Typography>
              <Searchbar />
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={accountMenuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          : ''
      }
      {renderAccountMenu}
      {renderMenu}
    </div>
  );
}
