import { useContext } from 'react';
import { Typography } from '@mui/material';
import { authContext } from '../../helpers/authContext';

const HomePage = () => {
    const loggedIn = useContext(authContext);
    // JEŚLI ZALOGOWANY TO 1 WIADOMOŚĆ, A JEŚLI NIE TO DRUGA
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
                Welcome to Dictionary App!
            </Typography>
            <p>This platform is used to search the meaning of words for logged-in users. To find the definition you are interested in, please log into your account.</p>

            <Typography
                variant="h3"
                align="center"
                sx={{
                    my: "0.8rem",
                    fontSize: "2rem",
                    fontWeight: "400",
                }}>
                Welcone xyz!
            </Typography>
            <p>On this page you can check the meaning of a word. Remember, only logged-in users can create their list of words to remember on their profile.</p>
        </>
    )
}

export default HomePage