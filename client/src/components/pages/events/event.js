// COMPONENTS
import React from "react";
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
  Button
} from "@material-ui/core";
import {
  AccountCircle,
  CheckCircleOutlineOutlined,
  CheckCircle,
  ExposurePlus1,
  Event as EventIcon,
  AssignmentInd,
  Schedule
} from "@material-ui/icons";
import Megatron from "../../megatron";

// FUNCTIONS
import { makeStyles } from "@material-ui/core/styles";
import { GetFormattedTime } from "../../../utils/formatTime";
import ExtractProfileImage from "../../../utils/extractprofileimage";
import GoogleMap from "../../map";

const useStyles = makeStyles(theme => ({
  attendence: {
    marginRight: '3px'
  },
  attendenceButton: {
    display: 'inline-block',
    marginRight: "12px"
  },
  memberLink: {
    display: 'block'
  },
  memberLinkContents: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  avatarImg: {
    maxWidth: '100%'
  }
}));

export default function Event(props) {
  const { YourProfile, thisEvent, handleToggleAttendence, attending } = props;
  const start_time = GetFormattedTime(thisEvent.start_time);
  const end_time = GetFormattedTime(thisEvent.end_time);
  const classes = useStyles();

  return (
    <>
      <Megatron
        heading={thisEvent.name}
        image="/images/event.jpg"
        imagePosition="0 76%"
      />
      <Grid container className="theme-paddingx2" spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" title="Event Date">
            <EventIcon className={classes.attendence} alt="Event Date" />
            <Typography variant="srOnly">Event Date</Typography>
            {thisEvent.date}
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
            {/* <strong>Created By:&nbsp;</strong> */}
            <Link
              href={
                YourProfile.id === thisEvent.founder.id
                  ? "/profile"
                  : `/community/${thisEvent.CommunityId}/friends/${thisEvent.founder.id}`
              }
            >
              {thisEvent.founder.name}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} className="attendenceNav">
          <Box component="nav">
            {attending ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleToggleAttendence}
                className={classes.attendenceButton}
              >
                <CheckCircle className={classes.attendence} />
                Attending
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleToggleAttendence}
                className={classes.attendenceButton}
              >
                <CheckCircleOutlineOutlined className={classes.attendence} />
                Attend
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              size="small"
              className={classes.attendenceButton}
            >
              <ExposurePlus1 className={classes.attendence} />
              Invite
            </Button>
          </Box>
          <Divider className="mt-4" />
        </Grid>
      </Grid>
      <Grid container className="theme-paddingx2" spacing={1}>
        <Grid item xs={12} sm={8}>
          <Box>
            <Typography variant="h6">About:</Typography>
            <Typography variant="body1">{thisEvent.description}</Typography>
          </Box>
          <br />
          <Divider light={true} />
          <Box>
            <Typography variant="h6">Location:</Typography>
            <Typography variant="body2">{thisEvent.location}</Typography>
            <br />
            <GoogleMap location={thisEvent.location} />
          </Box>
        </Grid>
        {thisEvent.members.length ? (
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Attendees: </Typography>
            <Divider light={true} />
            <List>
              {thisEvent.members.map(member => (
                <ListItem key={member.id}>
                  <Link
                    href={`/community/${thisEvent.CommunityId}/friends/${member.id}`}
                    className="memberLink"
                  >
                    <ListItemAvatar className={classes.memberLinkContents}>
                      <Avatar>
                        <img
                          src={ExtractProfileImage(member)}
                          alt={member.name}
                          className={classes.avatarImg}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.memberLinkContents}>
                      {member.name}
                    </ListItemText>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}
