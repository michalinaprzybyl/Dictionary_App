import React from 'react';
import { Card, Typography, TextField, Button } from "@mui/material";
import { auth } from '../../helpers/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import "./RegisterForm.css";
import { useForm } from 'react-hook-form';
import { RegisterFormData } from '../../helpers/interfaces';


const RegisterForm = () => {
    const { register, handleSubmit } = useForm<RegisterFormData>();

    const submitHandler = ({ email, password, password2 }: RegisterFormData) => {
        console.log({ email, password, password2 });

        if (password === password2) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Successfully registered"))
                .catch((err) => console.error(err.message));
        } else {
            console.log("Passwords are not the same");
        }
    }

    return (
        <Card sx={{ mt: "1rem", display: "block", mx: "auto", p: "10px", width: "75%" }}>
            <form id="formStyle" onSubmit={handleSubmit(submitHandler)}>
                <Typography align="center" variant="h2" sx={{ fontSize: "1.5rem" }}>Register new account</Typography>
                <TextField type="email" placeholder='email' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("email", { required: true })} />
                <TextField type="password" placeholder='password' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("password", { required: true })} />
                <TextField type="password" placeholder='repeat password' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("password2", { required: true })} />
                <Button variant="contained" type="submit" sx={{ display: "block", mx: "auto" }}>Register</Button>
            </form>
        </Card>
    )
}

export default RegisterForm