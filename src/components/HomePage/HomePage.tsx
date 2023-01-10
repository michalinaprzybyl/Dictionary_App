import React from 'react';
import { Card, Typography } from '@mui/material';

const HomePage = () => {
    return (
        <Card sx={{ mt: "1rem", display: "block", mx: "auto", px: "5%", py: "2%", width: "75%" }}>
            <Typography variant="h3" align="center" sx={{ pt: ".3rem", my: "1.3rem", fontSize: "2rem", fontWeight: "400" }}>
                Welcome to Dictionary App!
            </Typography>

            <Typography sx={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                On this page you can check the meanings of English words. Any person can use this dictionary and find the definition that interests them. Remember that only logged-in users have the ability to create their own list of words to remember, which they will find on their profile.
            </Typography>

            <Typography variant="h4" align="center" sx={{ my: "1.3rem", fontSize: "1.5rem", fontWeight: "400" }}>
                Have fun with our dictionary!
            </Typography>
        </Card>
    )
}

export default HomePage