import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import "./LoginPage.css";

const LoginPage = () => {
    return (
        <>
            <LoginForm />
            <Typography variant='h6' sx={{ fontWeight: 100, textAlign: "center", mt: "15px" }}>
                Don't have an account yet? Register now!
            </Typography>
            <Link to='/register' className='link-style'>
                <Button variant='outlined' sx={{
                    ':hover': {
                        borderColor: "#81007F",
                    }, display: "block", mx: "auto", mt: "8px", color: "#81007F", borderColor: "#81007F"
                }}>Register</Button>
            </Link>
        </>
    )
}

export default LoginPage