import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function LoginButton() {
    return (
        <Button variant="primary" type="submit">Submit</Button>
    )
}

export function Register() {
    return (
        <Link to="/register" className="btn btn-danger">
          Register
        </Link>
    )
}