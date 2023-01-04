import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <>
            <LoginForm />
            <Typography variant='h6' sx={{ fontWeight: 100, textAlign: "center", mt: "15px" }}>Don't have an account yet? Register now!</Typography>
            <Link to='/register' style={{ textDecoration: "none" }}>
                <Button variant='outlined' sx={{ display: "block", mx: "auto", mt: "8px" }}>Register</Button>
            </Link>
        </>
    )
}

export default LoginPage