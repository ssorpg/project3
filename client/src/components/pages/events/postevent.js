import React, {Component} from 'react';
import {Container, Paper} from '@material-ui/core';

export default class PostEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fomrData: undefined,
      communities: props.communities
    }
  }

  render() {
    return (
      <Container>
        <Paper>
        <form
          onChange={this.props.handleInputChange}
          onSubmit={this.props.handleSubmit}
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
            {this.state.communities.map( item => (
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
        </form>
      </Paper>
      </Container>
    )
  }
}