"use client"

import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import DetailHeader from "./DetailHeader"
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function IngredientDetail({getData, id, deleteIngredient }) {
    const [uid, setUid] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
                getUserData(user.uid);
            } else {
                console.log("not logged in")
            }
        });
    }, [])

    useEffect(() => {
        if (uid) {
            console.log("UID: " + uid);
            getUserData(uid);
        }
    }, [uid]);

    const getUserData = async(uid) => {
        setData(await getData(uid))

    }

    return (
        <div>
            {data ? (
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", gap: '32px' }}>
                    <DetailHeader data={data} deleteIngredient={deleteIngredient} id={id} />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", gap: "32px", width: '100%', flexDirection: { xs: "column", sm: "row" } }}>
                        <Box>
                            <Typography sx={{ color: 'rgb(207, 0, 207)', fontSize: { xs: "20px", sm: '32px' } }}>{data.description}</Typography>
                            <Typography sx={{ color: 'rgb(0, 255, 0)', fontSize: { xs: "16px", sm: '24px' } }}>Price: ${data.price}</Typography>
                            <Typography sx={{ color: 'yellow', fontSize: { xs: "16px", sm: '24px' } }}>Quantity: {data.quantity}</Typography>
                        </Box>

                        <Box component="img" src={data.img} sx={{ width: { xs: '250px', md: '500px' }, borderRadius: '12px' }}></Box>
                    </Box>

                </Container>
            ) : (
                <p>No data found</p>
            )}
        </div>
    )
}