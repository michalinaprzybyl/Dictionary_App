import React from 'react';
import { TextField, Button, Typography, Card } from '@mui/material';
import { useForm } from "react-hook-form";
import { auth } from '../../helpers/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import "./LoginForm.css";
import { LoginFormData } from '../../helpers/interfaces';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { register, handleSubmit } = useForm<LoginFormData>();

    const navigate = useNavigate();

    const submitHandler = ({ email, password }: LoginFormData) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Successfully logged in");
                navigate("/");
            })
            .catch(() => alert("Incorrect email or password"));
    }

    return (
        <Card sx={{ mt: "1rem", display: "block", mx: "auto", p: "10px", width: "75%" }}>
            <form className="login-form-style" onSubmit={handleSubmit(submitHandler)}>
                <Typography align="center" variant="h2" sx={{ fontSize: "1.5rem", mb: ".5rem" }}>Log in to your account</Typography>
                <TextField variant="outlined" type="email" placeholder='email' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("email", { required: true })} />
                <TextField variant="outlined" type="password" placeholder='password' sx={{ display: "block", my: ".8rem", mx: "auto" }} {...register("password", { required: true })} />
                <Button type="submit" variant='contained' sx={{
                    ':hover': {
                        borderColor: "#81007F",
                        backgroundColor: "#81007F",
                    }, display: "block", mx: "auto", mb: "1rem", backgroundColor: "#81007F"
                }}>Log in</Button>
            </form>
        </Card>
    )
}

export default LoginForm