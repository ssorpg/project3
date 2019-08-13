import React from 'react';
import Nav from '../components/navbar';
import Container from '../components/container'
import { LoginForm } from '../components/form';
import { Register } from '../components/buttons';
import { Footer } from '../components/footer';

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
