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
        <ListItem className='list-item-style'>
            <Card variant="outlined" sx={{ width: '70%', padding: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div className='div-style'>
                    <ListItemText><b>Word:</b> {def.keyword}</ListItemText>
                    <ListItemText><b>Definition:</b> {def.definition}</ListItemText>
                    <ListItemText><b>Part of speech:</b> {def.partOfSpeech}</ListItemText>
                </div>
                <div>
                    {loggedIn &&
                        <>
                            {liked || def?.selected ? <TurnedInIcon sx={iconStyle} onClick={unlikeTheArticle} /> : <TurnedInNotIcon sx={iconStyle} onClick={likeTheArticle} />}
                        </>
                    }
                </div>
            </Card>
        </ListItem >
    )
}

export default LikedWords 