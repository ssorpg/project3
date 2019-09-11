// COMPONENTS
import React from 'react';
import { Button, TextField, Link, Paper, Grid, Typography } from '@material-ui/core';
import Modal from '../../modal';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  totalSizeFix: {
    minHeight: '100vh',
    marginBottom: '-12px',
  },

  leftImage: {
    backgroundImage: 'url(/images/home.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'initial'
    }
  },

  imageLogo: {
    postion: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    alignItems: 'center',
    background: 'linear-gradient(180deg, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100%)',
    padding: '24px 24px 72px'
  },

  websiteTitle: {
    fontSize: '30px',
    color: '#1d1d1d'
  },

  slogan: {
    fontSize: '16px',
    // color: '#DBDADA',
    color: '#3d3d3d'
  },

  rightLogin: {
    margin: '96px 48px'
  }
}));

export default function Home(props) {
  const { handleSubmit, alert } = props;

  const classes = useStyles();

  console.log(handleSubmit);

  return (
    <Grid container component="main" className={classes.totalSizeFix}>
      <Grid item sm={4} md={7} className={classes.leftImage} >
        <Grid item className={classes.imageLogo + " full-width text-center"}>
          <img src="https://i.ibb.co/6WVS2GB/tpn2.png" alt="" />
          <span className={classes.websiteTitle} >The Private Network</span>
          <p className={classes.slogan}>
            This is a social network that you can control access to.
            Use it to keep in touch with your friends and family, hold events for your office, or to organize your child’s sports team.
            Hold events, send messages, and post your important news to only selected individuals in your network.
          </p>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.rightLogin + " flex-col flex-center"}>
          <img src="https://i.ibb.co/6WVS2GB/tpn2.png" alt="" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="full-width theme-mt" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="theme-mt"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item className="theme-mt">
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {
              alert ?
                <Modal error={alert} />
                : ''
            }
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
