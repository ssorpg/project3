// COMPONENTS
import React from 'react';
import {
  Typography,
  Grid,
  Divider,
  Link,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Avatar,
  Box,
  Button,
  Paper
} from '@material-ui/core';
import {
  CheckCircleOutlineOutlined,
  CheckCircle,
  Event as EventIcon,
  AssignmentInd,
  Schedule
} from '@material-ui/icons';
import Modal from '../../modal';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import { GetFormattedTime, GetFormattedDate } from '../../../utils/formattime';
import ExtractProfileImage from '../../../utils/extractprofileimage';
import GoogleMap from '../../map';

const useStyles = makeStyles(theme => ({
  fixmt: {
    marginTop: 0
  },

  attendence: {
    marginRight: '3px'
  },

  memberLinkContents: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },

  lessPaddingTop: {
    paddingTop: '0 !important'
  }
}));

export default function Event(props) {
  const { YourProfile, thisEvent, members, handleToggleAttendence, attending, alert } = props;

  const classes = useStyles();
  const start_time = GetFormattedTime(thisEvent.start_time);
  const end_time = GetFormattedTime(thisEvent.end_time);
  const date = GetFormattedDate(thisEvent.date);

  return (
    <Paper>
      <Grid container className={classes.fixmt + " theme-paddingx2"} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" title="Event Date">
            <EventIcon className={classes.attendence} alt="Event Date" />
            <Typography variant="srOnly">Event Date</Typography>
            {date}
          </Typography>
          <Typography variant="body1" title="Event Time" className="mt-2">
            <Schedule className={classes.attendence} />
            <Typography variant="srOnly">Event Time</Typography>
            {start_time} - {end_time}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" title="Event Creator">
            <AssignmentInd className={classes.attendence} alt="Event Creator" />
            <Typography variant="srOnly">Event Created By:</Typography>
            <Link
              href={
                YourProfile.id === thisEvent.founder.id
                  ? '/profile'
                  : `/community/${thisEvent.CommunityId}/friends/${thisEvent.founder.id}`
              }
            >
              {thisEvent.founder.name}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} className="attendenceNav">
          <Box component="nav">
            {
              attending ?
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleToggleAttendence}
                  className="inline-button"
                >
                  <CheckCircle className={classes.attendence} />
                  Attending
              </Button>
                :
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={handleToggleAttendence}
                  className="inline-button"
                >
                  <CheckCircleOutlineOutlined className={classes.attendence} />
                  Attend
              </Button>
            }
            {
              alert ?
                <Modal error={alert} />
                : ''
            }
          </Box>
          <Divider className="mt-4" />
        </Grid>
      </Grid>
      <Grid container className={classes.lessPaddingTop + " theme-paddingx2 theme-mbx2"} spacing={2}>
        <Grid item xs={12} sm={8}>
          <Box className="theme-mbx2">
            <Typography variant="h6">Description:</Typography>
            <Typography variant="body1">{thisEvent.description}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">Location:</Typography>
            <Typography variant="body2">{thisEvent.location}</Typography>
            <br />
            <GoogleMap location={thisEvent.location} />
          </Box>
        </Grid>
        {
          members.length ?
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Attendees: </Typography>
              <Divider light={true} />
              <List>
                {
                  members.map(member =>
                    <ListItem key={member.id}>
                      <Link
                        href={
                          YourProfile.id === member.id
                            ? '/profile'
                            : `/community/${thisEvent.CommunityId}/friends/${member.id}`
                        }
                        className="memberLink"
                      >
                        <ListItemAvatar className={classes.memberLinkContents}>
                          <Avatar src={ExtractProfileImage(member)} alt={member.name}>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={classes.memberLinkContents}>
                          {member.name}
                        </ListItemText>
                      </Link>
                    </ListItem>
                  )
                }
              </List>
            </Grid>
            : ''
        }
      </Grid>
    </Paper>
  );
}
