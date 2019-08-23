// // COMPONENTS
// import React from 'react';
// import { Container, Jumbotron, Row, Col } from 'react-bootstrap';

// // IMAGES
// import tpn from '../../../images/tpn.png'

// export default function Home() {
//   return (
//     <Container style={{ textAlign: 'center' }}>
//       <img src={tpn} alt="icon" />
//       <Jumbotron id="welcome">
//         <h1>Social Networking. Privatized.</h1>
//         <p>Imagine a social network for just you and your friends and family. Well stop imagining. We made it. And it’s awesome.</p>
//       </Jumbotron>
//       <Row>
//         <Col>
//           <Jumbotron>
//             <p>Pour-over poutine coloring book, asymmetrical cray pitchfork jianbing taxidermy marfa art party cronut. Pork belly hot chicken XOXO, mustache vinyl succulents hoodie twee selfies enamel pin tousled sartorial schlitz chicharrones yr. Man braid raclette migas fashion axe cornhole tbh gastropub. Jean shorts irony iPhone, tofu chia brooklyn actually edison bulb 3 wolf moon. Pour-over wolf deep v skateboard beard brooklyn.</p>
//           </Jumbotron>
//         </Col>
//       </Row>
//     </Container>
//   )
// }

//old code saved above

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ax from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © T P N'}
      <Link color="inherit" href="https://material-ui.com/">
        The Private Network
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

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
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
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
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

