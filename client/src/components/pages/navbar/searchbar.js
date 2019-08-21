import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function Searchbar() {
  return (
    <Form inline>
      {/* // TODO make search route to handle searches */}
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  )
}
