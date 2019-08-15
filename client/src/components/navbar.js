import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" >
                <Navbar.Brand href="#home">TPN</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto nav navbar-nav navbar-left">
                        <Nav.Link href="#home">Feed</Nav.Link>
                        <Nav.Link href="#link">Profile</Nav.Link>
                        <NavDropdown title="Communities" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="nav navbar-nav navbar-right">
                        <Button>Login</Button>
                        <Button>Logout</Button>
                        <Form inline>
                            {/* // TODO make search route to handle searches */}
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;