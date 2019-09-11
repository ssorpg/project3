// COMPONENTS
import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@material-ui/core';

// FUNCTIONS
import { GetFormattedTime, GetFormattedDate } from '../../../utils/formattime';

export default function FeedEvent(props) {
  const { thisEvent } = props;

  const start_time = GetFormattedTime(thisEvent.start_time);
  const end_time = GetFormattedTime(thisEvent.end_time);
  const date = GetFormattedDate(thisEvent.date);

  return (
    <Card className="full-width">
      <CardActionArea className="reset-a" component="a" href={`/community/${thisEvent.CommunityId}/events/${thisEvent.id}`}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {thisEvent.name}
          </Typography>
          <Typography color="textSecondary">
            {date}
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            {start_time} - {end_time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
