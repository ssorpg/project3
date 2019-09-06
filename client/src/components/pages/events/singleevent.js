// COMPONENTS
import React, { Fragment } from "react";
import { Typography, Grid, Divider,
  Link, List, ListItemAvatar,
  ListItem, ListItemText, Avatar }
from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import Megatron from "../../megatron";
// FUNCTIONS
import { makeStyles } from "@material-ui/core/styles";
import ExtractProfileImage from '../../../utils/extractprofileimage';
// IMAGES
import image from "./images/adam-whitlock-I9j8Rk-JYFM-unsplash.jpg";

const useStyles = makeStyles({
  resetListStyle: {
    listStyle: "none"
  }
});

export default function SingleEvent(props) {
  const classes = useStyles();
  const { getFormattedTime, event } = props;
  const start_time = getFormattedTime(event.start_time);
  const end_time = getFormattedTime(event.end_time);

  console.log(event);
  return (
    <Fragment>
      <Megatron heading={event.name} image={image} imagePosition="0 76%" />
      <Grid container className={classes.body} spacing={6}>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>
              Created By:&nbsp;
            </strong>
            <Link
              href={`/community/${event.CommunityId}/friends/${event.founderId}`}
            >
              {event.founder.name}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>{event.date}</strong> : {start_time} : {end_time}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <br />
        <Divider />
        <br />
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h5">{event.description}</Typography>
        </Grid>
        {
          event.members.length > 0 ? 
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Attendees: </Typography>
            <Divider />
            
            <List>
            {
              event.members.map( member => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {
                        member.profileImage[0] !== undefined ?
                      (
                        <img src={ExtractProfileImage(member)} />
                      )
                      :
                      (
                        <AccountCircle />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <Link href={`/community/${event.CommunityId}/friends/${member.id}`}>{member.name}</Link>
                  </ListItemText>
                </ListItem>
              ))
            }
            </List>
          </Grid>
        :
        ''
        }
      </Grid>
    </Fragment>
  );
}
