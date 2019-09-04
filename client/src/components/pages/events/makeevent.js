// COMPONENTS
import React from 'react';
import { Container, Paper } from '@material-ui/core';
import Modal from '../../modal';

export default function MakeEvent(props) {
  const { handleInputChange, handleSubmit, alert, communities } = props;
  //TODO 1 : add google maps and use that to add locations to events
  //TODO 2 : make event page to show one event - should it go through communities?
  return (
    <Container>
      <Paper>
        <form
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        >
          <label for="name">Event Name</label>
          <input name="name" type="text" />
          <br />
          <label for="description">Event Description</label>
          <input name="description" type="text" />
          <br />
          <label for="date">Event Date</label>
          <input name="date" type="date" />
          <br />
          <label for="start_time">Event Start Time</label>
          <input name="start_time" type="time" />

          <br />
          <label for="end_time">Event Start Time</label>
          <input name="end_time" type="time" />
          <br /><br />
          <h5>Select a community for the event:</h5>
          <ul>
            {communities.map(item => (
              <li key={item.id}>
                <label for='communityId'>
                  <input type="radio" name='communityId' value={item.id} />
                  {item.name}
                </label>
              </li>
            ))}
          </ul>

          <button name="submit" type="submit">Submit</button>
          <button name="reset" type="reset">Reset</button>
          {
            alert ?
              <Modal error={alert} />
              : ''
          }
        </form>
      </Paper>
    </Container>
  );
};
