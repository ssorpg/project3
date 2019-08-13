import React from 'react';
import Container from '../container'
import { RegisterForm } from '../form';
import { Register } from '../buttons';
import { Link } from 'react-router-dom';

function RegisterPage() {
    return (
        <div className="Register">
            <Container>
                <RegisterForm />
                <Link to="/profile"><Register /></Link>
            </Container>
        </div>
    );
}

export default RegisterPage;
