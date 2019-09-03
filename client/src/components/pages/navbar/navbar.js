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
  scrollNav: {
    position: 'fixed',
    zIndex: '999'
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

  minDrawerWidth: {
    minWidth: '250px'
  },

  resetA: {
    color: '#fff',
    '&:hover': {
      color: '#d9d9d9',
      textDecoration: 'none'
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

export default function Navbar(props) {
  const { YourProfile, CommunityId } = props;

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
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
        <a href="/profile" className={classes.linkStyleReset}><MenuItem><ListItemText primary={'Your Profile'} /></MenuItem></a>
        {
          CommunityId ?
            YourProfile.communities.map(community => {
              return(CommunityId === community.id ? // this is just ugly from lines 98 to 113 - TODO make this not gross to look at
              <>
                <a href={`/community/${community.id}`} className={classes.linkStyleReset}><MenuItem><ListItemText primary={`${community.name} Feed`} /></MenuItem></a>
                <a href={`/community/${community.id}/friends`} className={classes.linkStyleReset}><MenuItem><ListItemText primary={`${community.name} Friends`} /></MenuItem></a>
                <a href={`/community/${community.id}/events`} className={classes.linkStyleReset}><MenuItem><ListItemText primary={`${community.name} Events`} /></MenuItem></a>
                {/* <a href={`/community/${community.id}/chat`} className={classes.linkStyleReset}><MenuItem><ListItemText primary={`${community.name} Chat`} /></MenuItem></a> */}
              </>
                : '')
            })
            : YourProfile.communities.map(community => {
              return (<a href={`/community/${community.id}`} className={classes.linkStyleReset}><MenuItem><ListItemText primary={`${community.name} Feed`} /></MenuItem></a>);
            })
        }
        <a href={`/chat`} className={classes.linkStyleReset}><MenuItem>Global Chat</MenuItem></a>
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </List> */}
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
        {/* <a href="/profile" className={classes.linkStyleReset}><MenuItem><ListItemText primary={'Your Profile'} /></MenuItem></a> */}
        <a href="/updateprofile" className={classes.linkStyleReset}><MenuItem><ListItemText primary={'Update Profile'} /></MenuItem></a>
        <a href="/joincommunity" className={classes.linkStyleReset}><MenuItem><ListItemText primary={'Join/Create Community'} /></MenuItem></a>
        <MenuItem className={classes.logout} onClick={logout}><ListItemText primary={'Logout'} /></MenuItem>
        <a href="/chat" className={classes.linkStyleReset}><MenuItem><ListItemText primary={'Global Chat'} /></MenuItem></a>
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div className={classes.scrollNav}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="open drawer"
            aria-haspopup="true"
            onClick={toggleDrawer('left', true)}
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <a href="/" className={classes.resetA}>
              The Private Network
            </a>
          </Typography>
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
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

         /* This was causing a merge conflict but I didn't want to remove it, just in case?
<Searchbar />
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
*/

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
