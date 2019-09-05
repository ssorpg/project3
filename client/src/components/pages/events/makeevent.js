// COMPONENTS
import React from "react";
import { Paper } from "@material-ui/core";
import Modal from "../../modal";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStlyes = makeStyles(theme => ({
  paper: {
    padding: "25px"
  },
  dense: {
    margin: 5
  },
  select: {
    minWidth: "100%"
  },
  button: {
    marginRight: '15px'
  }
}));
export default function MakeEvent(props) {
  const classes = useStlyes();
  const { handleInputChange, handleSubmit, alert, communities } = props;

  //TODO 1 : add google maps and use that to add locations to events - youll need the grid
  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Event Name"
          placeholder="Placeholder"
          margin="dense"
          type="text"
          onChange={handleInputChange}
          required
        />

        <TextField
          id="description"
          label="Event Description"
          placeholder="Placeholder"
          margin="dense"
          type="text"
          onChange={handleInputChange}
          required
        />
        <br />
        <TextField
          id="date"
          helperText="Event Date"
          margin="dense"
          type="date"
          onChange={handleInputChange}
          required
        />

        <TextField
          id="start_time"
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
          id="communityId"
          className={classes.select}
          select
          margin="dense"
          onChange={handleInputChange}
          SelectProps={{
            native: true
          }}
          required
        >
          <option selected="selected" disabled="disabled">
            Choose A Community
          </option>
          {communities.map(item => (
            <option key={item.id} name={item.name} value={item.id}>
              {item.name}
            </option>
          ))}
        </TextField>
        <br />
        <br />
        <Button className={classes.button} variant="contained" color="primary" name="submit" type="submit">
          Submit
        </Button>
        <Button className={classes.button} variant="outlined" color="secondary" name="reset" type="reset">
          Reset
        </Button>
        {alert ? <Modal error={alert} /> : ""}
      </form>
    </Paper>
  );
}
