// COMPONENTS
import React from 'react';
import { Button, TextField, Link, Grid, Typography, Container } from '@material-ui/core';
import Modal from '../../modal';

export default function Register(props) {
  const { handleSubmit, alert } = props;

  return (
    <Container component="main" maxWidth="xs">
      <div className="flex-col flex-center">
        <img src="https://i.ibb.co/6WVS2GB/tpn2.png" alt="" />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className="full-width theme-mtx3" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="theme-mt"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end" className="theme-mt">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
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
    </Container>
  );
};
