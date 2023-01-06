import React from 'react'
import { List } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import LikedWords from '../LikedWords/LikedWords';
import SearchForm from '../SearchForm/SearchForm';
import { DefinitionObj } from '../../helpers/interfaces';

const SearchPage = () => {
    const [keyword, setKeyword] = useState("");
    const [definitions, setDefinitions] = useState([]);

    const options = {
        headers: {
            'X-RapidAPI-Key': '24fa9576d2mshb13ab294cd1ce6ep15ed67jsn70a39ee6911e',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    }

    useEffect(() => {
        if (keyword)
            axios.get(`https://wordsapiv1.p.rapidapi.com/words/${keyword}/definitions`, options)
                .then((response) => {
                    console.log(response.data);
                    setDefinitions(response.data.definitions);
                })
                .catch((err) => console.log(err.message));
    }, [keyword]);

    return (
        <>
            <SearchForm setKeyword={setKeyword} />
            <List sx={{ width: '100%', bgcolor: 'background.paper', alignContent: 'center' }}>
                {definitions.length !== 0 && definitions.map((def: DefinitionObj) => {
                    return <LikedWords def={def} key={def.definition} />
                })}
            </List>
        </>
    )
}

export default SearchPage