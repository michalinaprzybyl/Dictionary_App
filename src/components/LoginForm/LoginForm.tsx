import Rreact from 'react';
import { TextField, Button, Typography, Card } from '@mui/material';
import { useForm } from "react-hook-form";
import { auth } from '../../helpers/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import "./LoginForm.css";
import { LoginFormData } from '../../helpers/interfaces';

const LoginForm = () => {
    const { register, handleSubmit } = useForm<LoginFormData>();

    const submitHandler = ({ email, password }: LoginFormData) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log("Successfully logged in"))
            .catch((err) => alert("Incorrect email or password"));
    }

    return (
        <Card sx={{ mt: "1rem", display: "block", mx: "auto", p: "10px", width: "75%" }}>
            <form id="formStyle" onSubmit={handleSubmit(submitHandler)}>
                <Typography align="center" variant="h2" sx={{ fontSize: "1.5rem", mb: ".5rem" }}>Log in to your account</Typography>
                <TextField variant="outlined" type="email" placeholder='email' sx={{ display: "block", my: ".5rem", mx: "auto" }} {...register("email", { required: true })} />
                <TextField variant="outlined" type="password" placeholder='password' sx={{ display: "block", my: ".8rem", mx: "auto" }} {...register("password", { required: true })} />
                <Button type="submit" variant='contained' sx={{ display: "block", mx: "auto", mb: "1rem" }}>Log in</Button>
            </form>
        </Card>
    )
}

export default LoginForm