import { useContext, useState } from 'react'
import { Typography, Button } from "@mui/material";
import { auth, firestore } from '../../helpers/firebaseConfig';
import { signOut } from 'firebase/auth';
import { UserPageProps } from '../../helpers/interfaces';
import ProfilePhotoForm from '../ProfilePhotoForm/ProfilePhotoForm';
import { authContext } from '../../helpers/authContext';
import { onSnapshot, collection } from 'firebase/firestore';
import { DefinitionObj } from '../../helpers/interfaces';
import LikedWords from '../LikedWords/LikedWords';

const UserPage = () => {
    const loggedIn = useContext(authContext);
    const [likedWords, setLikedWords] = useState<DefinitionObj[] | []>([]);

    if (loggedIn && auth.currentUser) {
        onSnapshot(collection(firestore, auth.currentUser.uid), (querySnapshot) => {
            const likes: DefinitionObj[] = [];
            querySnapshot.forEach((doc) => likes.push(doc.data() as DefinitionObj));
            setLikedWords(likes);
        });
    }

    return (
        <>
            {loggedIn && auth.currentUser &&
                <>
                    <Typography variant="h2" sx={{ fontSize: "2rem", my: "1rem", borderBottom: "1px solid purple", pb: ".5rem" }} align="center">Your profile</Typography>
                    <Typography variant="h5" sx={{ fontSize: "1rem", my: "1rem", mx: "auto" }} align="center">Your email: {auth.currentUser.email}</Typography>
                    <ProfilePhotoForm />
                    {/* <Button variant="outlined" onClick={() => signOut(auth)} sx={{
                        ':hover': {
                            borderColor: "#81007F",
                        },
                        display: "block", mx: "auto", my: "1rem", border: "1px solid #81007F", color: "#81007F"
                    }}>Log out</Button> */}
                    <Typography variant="h3" align="center" sx={{ fontSize: "1.7rem", fontWeight: 400, borderTop: "1px solid #81007F", pt: "1rem", pb: ".5rem" }}>Liked definitions</Typography>
                    {likedWords.map((def) => {
                        return <LikedWords def={def} key={def.definition} />
                    })}
                </>
            }
        </>
    )
}

export default UserPage