import React from 'react';
import { Card, Typography, TextField, Button } from "@mui/material";
import { auth } from '../../helpers/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./RegisterForm.css";
import { useForm } from 'react-hook-form';
import { RegisterFormData } from '../../helpers/interfaces';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const { register, handleSubmit } = useForm<RegisterFormData>();

    const navigate = useNavigate();

    const submitHandler = ({ email, password, password2 }: RegisterFormData) => {
        if (password === password2) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert("Successfully registered");
                    navigate("/");
                })
                .catch((err) => console.error(err.message));
        } else {
            alert("You have entered incorrect data in any of the fields below. Please verify it and correct the errors so that you can register. Consider that you may already be registered.");
        }
    }

    return (
        <Card sx={{ mt: "1rem", display: "block", mx: "auto", p: "10px", width: "75%" }}>
            <form id="form-style" onSubmit={handleSubmit(submitHandler)}>
                <Typography align="center" variant="h2" sx={{ fontSize: "1.5rem" }}>Register new account</Typography>
                <TextField type="email" placeholder='email' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("email", { required: true })} />
                <TextField type="password" placeholder='password' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("password", { required: true })} />
                <TextField type="password" placeholder='repeat password' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("password2", { required: true })} />
                <Button variant="contained" type="submit" sx={{
                    ':hover': {
                        borderColor: "#81007F",
                        backgroundColor: "#81007F",
                    }, display: "block", mx: "auto", backgroundColor: "#81007F"
                }}>Register</Button>
            </form>
        </Card>
    )
}

export default RegisterForm