// COMPONENTS
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';
// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import ax from 'axios';

const handleSubmit = event => {
  event.preventDefault();
  const formData = event.target;
  const inputs = formData.getElementsByTagName('input');
  const postData = {};

  for (let i = 0; i < inputs.length; i++) {
    postData[inputs[i].name] = inputs[i].value;
  }
  console.log(postData);
  login(postData);
};

const login = async postData => {
  try {
    const res = await ax.post('/api/users', postData);
    console.log(res);
    if (res.status === 200) {
      window.location = `/profile`;
    }

  } catch (error) {
    console.log(error.response);
    // this.setState({ errorAlert: error.response.data });
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    // background: 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(https://source.unsplash.com/random)',
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  logo: {
    margin: 'auto',
    marginTop: '100px',
    width: '60%',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.8)',
    textAlign: 'center',

  },
  name: {
    fontSize: '30px',
    color: '#DBDADA'
  },
  slogan: {
    fontSize: '16px',
    color: '#DBDADA'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} >
        <Grid item xs={false} id="hide" className={classes.logo}>
          <img src="https://i.ibb.co/6WVS2GB/tpn2.png" />
          <span className={classes.name} >The Private Network</span>
          <p className={classes.slogan} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam eum cupiditate quaerat laudantium ullam aut rem deleniti obcaecati quas voluptates dolores iure modi, aliquam, illo quae. Hic dicta corrupti eos.</p>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}> */}
            {/* <LockOutlinedIcon /> */}
            <img src="https://i.ibb.co/6WVS2GB/tpn2.png" xs={false}/>
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

