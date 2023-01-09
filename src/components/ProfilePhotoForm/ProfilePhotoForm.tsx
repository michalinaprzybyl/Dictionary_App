import React from 'react';
import { useForm } from "react-hook-form";
import { Button, Card, Typography } from '@mui/material';
import { ProfilePhotoFormData } from '../../helpers/interfaces';
import { auth, storage } from '../../helpers/firebaseConfig';
import { ref, uploadBytes } from "firebase/storage";

const ProfilePhotoForm = () => {
    const { register, handleSubmit } = useForm<ProfilePhotoFormData>();

    const submitHandler = (data: ProfilePhotoFormData) => {
        // console.log(data);

        const photo = data.profilePhoto[0];
        if (auth.currentUser) {
            const storageRef = ref(storage, `/users/${auth.currentUser.uid}/profilePhoto`);
            // Przykład z końcówką dynamiczną, gdybym chciała dodać kilka zdjęć:
            // const storageRef = ref(storage, '/users/${auth.currentUser.uid}/${photo.name}');

            uploadBytes(storageRef, photo)
                .then((snapshot) => {
                    console.log('Successfully uploaded the photo');
                })
                .catch((err) => console.error(err.message));
        }
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Card sx={{ p: "1rem", width: "250px", mx: "auto" }}>
                <Typography variant='h6' sx={{ fontsize: '1rem' }} align="center">Upload your profile picture</Typography>

                <Button variant='contained' component="label" sx={{
                    ':hover': {
                        borderColor: "#81007F",
                        backgroundColor: "#81007F",
                    },
                    display: "block", mx: "auto", my: '1rem', alignContent: "center", backgroundColor: "#81007F"
                }}>
                    <Typography variant='h6' sx={{ fontSize: '1rem' }} align='center'>Select a file</Typography>
                    <input type="file" accept="image/png, image/jpeg" hidden {...register("profilePhoto", { required: true })} />
                </Button>

                {/* <input type="file" ></input> */}

                <Button variant='contained' sx={{
                    ':hover': {
                        borderColor: "#81007F",
                        backgroundColor: "#81007F",
                    },
                    display: "block", mx: "auto", backgroundColor: "#81007F", width: "100%"
                }} type='submit'>Upload</Button>
            </Card>
        </form>
    )
}

export default ProfilePhotoForm