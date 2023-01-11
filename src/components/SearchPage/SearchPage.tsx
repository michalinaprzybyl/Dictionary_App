import { useContext } from 'react'
import { List } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import LikedWords from '../LikedWords/LikedWords';
import SearchForm from '../SearchForm/SearchForm';
import { DefinitionObj } from '../../helpers/interfaces';
import { auth, firestore } from '../../helpers/firebaseConfig';
import { onSnapshot, collection } from 'firebase/firestore';
import { authContext } from '../../helpers/authContext';

const SearchPage = () => {
    const [keyword, setKeyword] = useState("");
    const [definitions, setDefinitions] = useState([]);
    const [userWords, setUserWords] = useState<DefinitionObj[] | []>([]);

    const loggedIn = useContext(authContext);

    const options = {
        headers: {
            'X-RapidAPI-Key': '24fa9576d2mshb13ab294cd1ce6ep15ed67jsn70a39ee6911e',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    }

    useEffect(() => {
        if (keyword) {
            axios.get(`https://wordsapiv1.p.rapidapi.com/words/${keyword}/definitions`, options)
                .then((response) => {
                    setDefinitions(response.data.definitions);
                });
        }
        if (loggedIn && auth.currentUser) {
            onSnapshot(collection(firestore, auth.currentUser.uid), (querySnapshot) => {
                const likes: DefinitionObj[] = [];
                querySnapshot.forEach((doc) => likes.push(doc.data() as DefinitionObj));
                setUserWords(likes);
            });
        }
    }, [keyword]);

    return (
        <>
            <SearchForm setKeyword={setKeyword} />
            <List sx={{ width: '100%', bgcolor: 'background.paper', alignContent: 'center' }}>
                {definitions.length !== 0 && definitions.map((def: DefinitionObj) => {
                    // tu potzrebuję dostęp do listy słówek usera
                    def.selected = !!userWords.find((userword) => userword.definition === def.definition);
                    def.keyword = keyword;
                    return <LikedWords def={def} key={def.definition} />
                })}
            </List>
        </>
    )
}

export default SearchPage