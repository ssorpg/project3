import React from 'react';
import Nav from '../navbar';
import Container from '../container'
import { LoginForm } from '../form';
import { Register } from '../buttons';
import { Footer } from '../footer';

function RegisterPage() {
    return (
        <div className="Register">
            <Nav />
            <Container>
                <LoginForm />
                <Register />
            </Container>
            <Footer fixed="bottom" />
        </div>
    );
}

export default RegisterPage;
