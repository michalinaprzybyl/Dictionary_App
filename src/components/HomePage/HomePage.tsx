import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import SearchForm from '../SearchForm/SearchForm';

const HomePage = () => {
    const [word, setWord] = useState('');

    const options = {
        headers: {
            'X-RapidAPI-Key': '24fa9576d2mshb13ab294cd1ce6ep15ed67jsn70a39ee6911e',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    }

    useEffect(() => {
        axios.get(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, options)
            .then((response) => {
                console.log(response.data);
                setWord(response.data);
            })
            .catch((err) => console.log(err.message));
    }, []);

    return (
        <>
            <Typography
                variant="h3"
                align="center"
                sx={{
                    my: "0.8rem",
                    fontSize: "2rem",
                    fontWeight: "400",
                }}>
                Find a word:
            </Typography>
            {/* <SearchForm /> */}
            <p>On this page you can check the meaning of a word. Remember, only logged-in users can create their list of words to remember on their profile.</p>

        </>
    )
}

export default HomePage