'use client'
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation'
import { Box, Button, Container, Typography } from "@mui/material";
export default function DetailHeader({ data, deleteIngredient, id }) {
    const router = useRouter();

    const [uid, setUid] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            } else {
                console.log("not logged in")
            }
        });
    }, [])

    useEffect(() => {
        if (uid) {
            setUid(uid);
        }
    }, [uid]);


    const handleUpdateClick = () => {
        router.push(`/ingredient/${id}/update`)
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
            <Typography variant="h3" sx={{ color: 'cyan' }}>{data.name}</Typography>
            <form action={() => deleteIngredient(uid)}>
                <Button type="submit">
                    <Box component="img" sx={{ height: '25px', '&:hover': { scale: '1.15' } }} src="https://raw.githubusercontent.com/iElvxn/pantry-pal/main/public/images/delete.png"></Box>
                </Button>
            </form>
            <Box component="img" sx={{ height: '25px', '&:hover': { scale: '1.15' } }} src="https://github.com/iElvxn/pantry-pal/blob/main/public/images/edit.png?raw=true" onClick={handleUpdateClick}></Box>
        </Box>
    )
}