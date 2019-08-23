// // COMPONENTS
// import React, { Component } from 'react';
// import { Navbar as Nav, Row, Col } from 'react-bootstrap';
// import { LoginForm, SearchForm } from '../../form';
// import NavbarLeft from './navbarleft';
// import NavbarRight from './navbarright';

// // IMAGES
// import close from '../../../images/icons/svg/cancel-circle.svg';
// // import login from '../../images/icons/svg/user-plus.svg';
// // import logout from '../../images/icons/svg/user-minus.svg';

// // FUNCTIONS
// import UserAuth from './utils/userauth';
// import CheckError from '../../../utils/checkerror';
// import ax from 'axios';

// export default class Navbar extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       CommunityId: window.location.pathname.match(/\/community\/([0-9]*)/) ?
//         window.location.pathname.match(/\/community\/([0-9]*)/)[1]
//         : undefined, // unfortunately can't use this.props.params because we always want navbar rendered and can only use params with router paths
//       isAuth: false
//     }
//   }

//   componentDidMount() {
//     const isAuth = UserAuth();
//     this.setState({ isAuth });
//   }

//   async logout() {
//     try {
//       await ax.get('/api/users/logout');

//       window.location = '/';
//     }
//     catch (error) {
//       CheckError(error);
//     }
//   }

//   toggleLogin() {
//     const loginForm = document.getElementById('login');

//     if (loginForm.className === 'expander open') {
//       loginForm.className = 'expander closed';
//     }
//     else {
//       loginForm.className = 'expander open';
//     }
//   }

//   render() {
//     return (
//       <Nav bg="light" expand="lg" id='site-nav' style={{ marginBottom: '20px' }}>
//         <Nav.Brand href="/">TPN</Nav.Brand>
//         <Nav.Toggle aria-controls="basic-navbar-nav" />
//         <Nav.Collapse id="basic-navbar-nav">
//           <NavbarLeft
//             CommunityId={this.state.CommunityId}
//           />
//           <NavbarRight
//             isAuth={this.state.isAuth}
//             logout={this.logout}
//             toggleLogin={this.toggleLogin}
//           />
//           {
//             this.state.isAuth ?
//               <SearchForm />
//               : ''
//           }
//         </Nav.Collapse>
//         <div className="expander closed" id="login">
//           <button className="btn icon closed" onClick={this.toggleLogin}>
//             <img src={close} alt="" />
//           </button>
//           <Row>
//             <Col>
//               <h5>Login or Register to begin</h5>
//               <LoginForm />
//             </Col>
//           </Row>
//         </div>
//       </Nav>
//     );
//   }
// }


// COMPONENTS
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

// FUNCTIONS
import CheckError from '../../../utils/checkerror';
import ax from 'axios';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },

  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  linkStyleReset: {
    color: 'initial',
    '&:hover': {
      color: 'initial',
      textDecoration: 'none'
    }
  },

  inputRoot: {
    color: 'inherit'
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
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
          <AppBar position="static">
            <Toolbar>
              {
                CommunityId ?
                  <IconButton
                    edge="start"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
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
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
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
