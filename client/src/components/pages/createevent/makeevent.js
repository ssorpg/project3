// COMPONENTS
import React from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import Modal from "../../modal";

// FUNCTIONS
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mr12px: {
    marginRight: '12px'
  }
}));

export default function MakeEvent(props) {
  const { handleInputChange, handleCreateEventSubmit, communities, alert  } = props;

  const classes = useStyles();

  // TODO 1 : add google maps and use that to add locations to events - youll need the grid
  return (
    <Paper className="theme-paddingx2">
      <form onSubmit={handleCreateEventSubmit}>
        <TextField
          id="name"
          className={classes.mr12px}
          label="Event Name"
          placeholder="Placeholder"
          margin="dense"
          type="text"
          onChange={handleInputChange}
          required
        />

        <TextField
          id="description"
          className={classes.mr12px}
          label="Event Description"
          placeholder="Placeholder"
          margin="dense"
          type="text"
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          id="location"
          className={classes.mr12px}
          label="Event Location"
          placeholder="Placeholder"
          margin="dense"
          type="text"
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          id="date"
          className={classes.mr12px}
          helperText="Event Date"
          margin="dense"
          type="date"
          onChange={handleInputChange}
          required
        />

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
          className={classes.mr12px}
          helperText="Event End Time"
          margin="dense"
          type="time"
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          id="CommunityId"
          className={classes.mr12px + " full-width"}
          select
          defaultValue="default"
          margin="dense"
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
            communities.map(community => (
              <option key={community.id} name={community.name} value={community.id}>
                {community.name}
              </option>
            ))
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
}
