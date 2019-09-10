// COMPONENTS
import React from "react";
import {
  Typography, Grid, Divider,
  Link, List, ListItemAvatar,
  ListItem, ListItemText, Avatar, Box
} from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import Megatron from "../../megatron";

// FUNCTIONS
import { GetFormattedTime } from '../../../utils/formatTime';
import ExtractProfileImage from '../../../utils/extractprofileimage';
import GoogleMap from '../../map';

export default function Event(props) {
  const { YourProfile, thisEvent } = props;

  const start_time = GetFormattedTime(thisEvent.start_time);
  const end_time = GetFormattedTime(thisEvent.end_time);

  return (
    <>
      <Megatron
        heading={thisEvent.name}
        image="/images/event.jpg"
        imagePosition="0 76%"
      />
      <Grid container className="theme-paddingx2" spacing={1}>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>
              Created By:&nbsp;
            </strong>
            <Link
              href={
                YourProfile.id === thisEvent.founder.id ?
                  '/profile'
                  : `/community/${thisEvent.CommunityId}/friends/${thisEvent.founder.id}`
              }
            >
              {thisEvent.founder.name}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>{thisEvent.date}</strong> : {start_time} - {end_time}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="theme-paddingx2 theme-mbx2" spacing={1}>
        <Grid item xs={12} sm={8}>
          <Box>
            <Typography variant="h6">Location:</Typography>
            <GoogleMap location={thisEvent.location} />
            {thisEvent.location}
          </Box>
          <Box>
            <Typography variant="h6">About:</Typography>
            <Typography variant="body1">{thisEvent.description}</Typography>
          </Box>
        </Grid>
        {
          thisEvent.members.length ?
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Attendees: </Typography>
              <Divider />
              <List>
                {
                  thisEvent.members.map(member =>
                    <ListItem key={member.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <img src={ExtractProfileImage(member)} alt={member.name} />
                          <AccountCircle />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <Link href={`/community/${thisEvent.CommunityId}/friends/${member.id}`}>{member.name}</Link>
                      </ListItemText>
                    </ListItem>
                  )
                }
              </List>
            </Grid>
            : ''
        }
      </Grid>
    </>
  );
};
