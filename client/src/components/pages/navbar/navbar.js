// COMPONENTS
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Searchbar from './searchbar';

// FUNCTIONS
import CheckError from '../../../utils/checkerror';
import ax from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  siteNav: {
    marginBottom: '48px'
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

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },

  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

export default function PrimarySearchAppBar({ isAuth, CommunityId }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [sidebarAnchorEl, setSidebarAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSidebarMenuOpen = Boolean(sidebarAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleMenuOpen(event) {
    setSidebarAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    setSidebarAnchorEl(null);
  }

  async function logout() {
    try {
      await ax.get('/api/users/logout');

      window.location = '/';
    }
    catch (error) {
      CheckError(error);
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
      <a href="/profile" className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Profile</MenuItem></a>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileAccountMenuId = 'primary-search-account-menu-mobile';
  const renderMobileAccountMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileAccountMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <a href="/profile"><p>Profile</p></a>
      </MenuItem>
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
      <a href={`/community/${CommunityId}`} className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Feed</MenuItem></a>
      <a href={`/community/${CommunityId}/friends`} className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Friends</MenuItem></a>
      <a href={`/community/${CommunityId}/chat`} className={classes.linkStyleReset}><MenuItem onClick={handleMenuClose}>Chat</MenuItem></a>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      {
        isAuth ?
          <AppBar position="static" className={classes.siteNav}>
            <Toolbar>
              {
                CommunityId ?
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
                  : ''
              }
              <a href="/profile" className={classes.linkStyleReset}>
                <Typography className={classes.title} variant="h6" noWrap>
                  TPN
                </Typography>
              </a>
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
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileAccountMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          : ''
      }
      {renderMobileAccountMenu}
      {renderAccountMenu}
      {renderMenu}
    </div>
  );
}
