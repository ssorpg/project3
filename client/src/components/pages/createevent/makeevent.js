// COMPONENTS
import React from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import Modal from '../../modal';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mr24px: {
    marginRight: '24px'
  },

  mr12px: {
    marginRight: '12px'
  },

  halfWidth: {
    minWidth: '50%'
  }
}));

export default function MakeEvent(props) {
  const { handleInputChange, handleCreateEventSubmit, communities, alert } = props;

  const classes = useStyles();

  // TODO 1 : add google maps and use that to add locations to events - youll need the grid
  return (
    <Paper className="theme-paddingx2">
      <form onSubmit={handleCreateEventSubmit}>
        <TextField
          id="name"
          className={classes.mr24px}
          label="Event Name"
          margin="none"
          type="text"
          onChange={handleInputChange}
          required
        />
        <TextField
          id="description"
          className={classes.halfWidth}
          label="Event Description"
          margin="none"
          type="text"
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          id="location"
          className={classes.mr24px}
          label="Event Location"
          margin="dense"
          type="text"
          onChange={handleInputChange}
          required
        />

        <TextField
          id="date"
          helperText="Event Date"
          margin="normal"
          type="date"
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          id="start_time"
          className={classes.mr12px}
          helperText="Event Start Time"
          margin="dense"
          type="time"
          onChange={handleInputChange}
          required
        />

        <TextField
          id="end_time"
          helperText="Event End Time"
          margin="dense"
          type="time"
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          id="CommunityId"
          className="full-width"
          select
          defaultValue="default"
          margin="normal"
          onChange={handleInputChange}
          SelectProps={{
            native: true
          }}
          required
        >
          <option value="default" disabled="disabled">
            Choose A Community
          </option>
          {
            communities.map(community =>
              <option key={community.id} name={community.name} value={community.id}>
                {community.name}
              </option>
            )
          }
        </TextField>
        <br />
        <br />
        <Button className={classes.mr12px} variant="contained" color="primary" name="submit" type="submit">
          Submit
        </Button>
        <Button className={classes.mr12px} variant="outlined" color="secondary" name="reset" type="reset">
          Reset
        </Button>
        {
          alert ?
            <Modal error={alert} />
            : ''
        }
      </form>
    </Paper>
  );
};
