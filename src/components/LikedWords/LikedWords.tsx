import { useState, useContext } from 'react';
import { LikedWordsProps } from '../../helpers/interfaces';
import { Card, ListItem, ListItemText, Typography } from '@mui/material';
import './LikedWords.css';
import { authContext } from '../../helpers/authContext';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { auth, firestore } from '../../helpers/firebaseConfig';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

const LikedWords: React.FC<LikedWordsProps> = ({ def }) => {
    console.log(def);

    const [liked, setLiked] = useState(false);

    const loggedIn = useContext(authContext);

    const iconStyle = {
        float: 'right',
        mr: '5px',
        my: '3px',
        color: liked ? '#81007F' : '#81007F',
    };

    const likeTheArticle = async () => {
        if (loggedIn && auth.currentUser) {
            await setDoc(doc(firestore, auth.currentUser.uid, def.definition), def);
            setLiked(true);
        }
    }

    const unlikeTheArticle = async () => {
        if (loggedIn && auth.currentUser) {
            await deleteDoc(doc(firestore, auth.currentUser.uid, def.definition));
            setLiked(false);
        }
    }

    return (
        <ListItem id='styled'>
            <Card variant="outlined" sx={{ width: '70%', padding: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ marginRight: '3.5%' }}>
                    <ListItemText sx={{ color: "black" }}>Definition: {def.definition}</ListItemText>
                    <ListItemText sx={{ color: "black" }}>Part of speech: {def.partOfSpeech}</ListItemText>
                </div>
                <div>
                    {loggedIn &&
                        <>
                            {liked ? <TurnedInIcon sx={iconStyle} onClick={unlikeTheArticle} /> : <TurnedInNotIcon sx={iconStyle} onClick={likeTheArticle} />}
                        </>
                    }
                </div>
            </Card>
        </ListItem >
    )
}

export default LikedWords