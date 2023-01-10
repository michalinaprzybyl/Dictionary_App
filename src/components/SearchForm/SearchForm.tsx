import React from 'react';
import { useForm } from 'react-hook-form';
import "./SearchForm.css";
import { SearchFormData, SearchFormProps } from '../../helpers/interfaces';
import { TextField, Button } from '@mui/material';

const SearchForm: React.FC<SearchFormProps> = ({ setKeyword }) => {
    const { register, handleSubmit } = useForm<SearchFormData>();

    const submitHandler = ({ keyword }: SearchFormData) => {
        setKeyword(keyword);
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='form-style'>
            <TextField placeholder='Keyword' sx={{ my: '.5rem', display: 'block', mx: 'auto' }} {...register("keyword", { required: true })} />
            <Button variant='contained' type='submit' sx={{
                ':hover': {
                    borderColor: "#81007F",
                    backgroundColor: "#81007F",
                }, display: 'block', mx: 'auto', backgroundColor: "#81007F"
            }}>Search</Button>
        </form>
    )
}

export default SearchForm 