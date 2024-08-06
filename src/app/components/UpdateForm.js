'use client'
import { useState, useEffect } from "react";
import { FormControl, Box, Container, Typography, Input, Button, FormLabel, colors } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function UpdateForm({ getData, updateIngredient }) {
    const [data, setData] = useState();
    const [uid, setUid] = useState();

    const [newIngredient, setNewIngredient] = useState();
    const [ingredName, setName] = useState('');
    const [ingredDesc, setDesc] = useState('');
    const [ingredQuantity, setQuantity] = useState('');
    const [ingredPrice, setPrice] = useState('');
    const [ingredImg, setImg] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
                fetchData(user.uid);
            } else {
                console.log("not logged in")
            }
        });
    }, [])

    useEffect(() => {
        if (uid) {
            setUid(uid);
            fetchData(uid);
        }
    }, [uid]);

    useEffect(() => {
        if(data) {
            console.log(data)
            setNewIngredient(data);
            setName(data.name);
            setDesc(data.description);
            setQuantity(data.quantity);
            setPrice(data.price);
            setImg(data.img);
        }
    }, [data])

    const fetchData = async(uid) => {
        const userData = await getData(uid);
        setData(userData)
    }

    return (
        <Container>
            <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel sx={{ color: "cyan" }}>Name: </FormLabel>
                    <Input value={ingredName} type='text' placeholder='Name of Ingredient' name='name' required onChange={(e) => { setNewIngredient({ ...newIngredient, name: e.target.value }); setName(e.target.value) }}></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel sx={{ color: "rgb(207, 0, 207)" }}>Description: </FormLabel>
                    <Input value={ingredDesc} type='text' placeholder='Description' name='description' onChange={(e) => { setNewIngredient({ ...newIngredient, description: e.target.value }); setDesc(e.target.value) }}></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel sx={{ color: "yellow" }}>Quantity: </FormLabel>
                    <Input value={ingredQuantity} type='number' placeholder='Quantity' name='quantity' required onChange={(e) => { setNewIngredient({ ...newIngredient, quantity: e.target.value }); setQuantity(e.target.value) }}></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel sx={{ color: "rgb(0, 255, 0)" }}>Price: </FormLabel>
                    <Input value={ingredPrice} type='double' placeholder='Price' name='price' required onChange={(e) => { setNewIngredient({ ...newIngredient, price: e.target.value }); setPrice(e.target.value) }}></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel sx={{ color: "red" }}>Image URL: </FormLabel>
                    <Input value={ingredImg} type='text' placeholder='Image URL' name='image' required onChange={(e) => { setNewIngredient({ ...newIngredient, img: e.target.value }); setImg(e.target.value) }}></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Button type='submit' onClick={() => { updateIngredient(uid, newIngredient) }}>Submit</Button>
                </Box>
            </FormControl>
        </Container>
    )
}