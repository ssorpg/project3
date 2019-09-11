// COMPONENTS
import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CardMedia,
  Grid,
  Divider,
  colors
} from "@material-ui/core";
import Status from "./status";
import Communities from "./communities";
import Invites from "./invites";

// FUNCTIONS
import { makeStyles } from "@material-ui/core/styles";
import ExtractProfileImage from "../../utils/extractprofileimage";
console.log(colors);
const useStyles = makeStyles(theme => ({
  profileAvatar: {
    backgroundColor: "#3f51b5",
    backgroundImage: "url(https://i.ibb.co/6WVS2GB/tpn2.png)",
    width: "125px",
    height: "125px"
  },
  profileImageContainer: {
    maxWidth: "500px",
    marginLeft: "24px"
  },
  statusBox: {
    backgroundColor: colors.grey["100"],
    padding: "1rem"
  }
}));

export default function ProfileInfo(props) {
  const { YourProfile, user } = props;

  const classes = useStyles();

  return (
    <Card className="theme-mbx2 p-3">
      <Grid
        container
        className="mb-3"
        alignItems="center"
        justify="space-between"
      >
        <Grid item xs={12} sm={6}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="friend"
                className={classes.profileAvatar}
                src={ExtractProfileImage(user)}
              />
            }
            title={<h3>{user.name}</h3>}
            subheader={
              <>
                <i>{user.location}</i>
              </>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.profileImageContainer + " theme-mbx2"}>
            {user.id === YourProfile.id ? <Status {...props} /> : ""}
          </div>
        </Grid>
        <Grid item xs={12} className={classes.statusBox}>
          <Typography variant="h4">
            Status: <strong>{user.status}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CardContent>
            <Typography paragraph variant="h5">
              <strong>Profile</strong>
            </Typography>
            <Typography paragraph>
              <strong>Bio:</strong>{" "}
              {user.bio ? user.bio : "This user has no bio yet."}
            </Typography>
            <Typography paragraph>
              <strong>Location:</strong>{" "}
              {user.location ? user.location : "Unknown"}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={6}>
          {user.communities ? <Communities {...props} /> : ""}
        </Grid>
        <Grid item xs={12} sm={6}>
          {user.invites ? <Invites {...props} /> : ""}
        </Grid>
      </Grid>
    </Card>
  );
}
