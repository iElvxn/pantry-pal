'use client'

import { FormControl, Box, Container, Typography, Input, Button, FormLabel } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthProvider";
import { db } from "../firebase";
import { useRouter } from "next/navigation";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    deleteDoc,
    getDoc,
    addDoc,
} from 'firebase/firestore'

export default function CameraAdd({ data }) {
    const counter = useRef(0);
    const [newItem, setNewItem] = useState({
        name: data[counter.current].name,
        description: "",
        quantity: data[counter.current].quantity,
        price: null,
        img: "",

    });
    const [ingredName, setName] = useState(data[counter.current].name);
    const [ingredDesc, setDesc] = useState('');
    const [ingredQuantity, setQuantity] = useState(data[counter.current].quantity);
    const [ingredPrice, setPrice] = useState('');
    const [ingredImg, setImg] = useState('');
    const uid = useAuth();
    const router = useRouter();

    const addIngredient = async (e) => {
        const userRef = (doc(db, 'users', uid))
        if (newItem.name && newItem.quantity && newItem.price) {
            await addDoc(collection(userRef, 'ingredients'), newItem);
            counter.current = counter.current + 1;
            if (data[counter.current] == null) {
                router.push('/ingredient')
            } else {
                setNewItem({
                    name: data[counter.current].name,
                    description: "",
                    quantity: data[counter.current].quantity,
                    price: 0,
                    img: "",
                })

                setName(data[counter.current].name);
                setDesc("");
                setQuantity(data[counter.current].quantity);
                setPrice(0);
                setImg("");
            }
        }
    }

    const handleSubmit = () => {
        addIngredient();
    }

    return (
        <Container>
            <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel sx={{ color: "cyan" }}>Name: </FormLabel>
                    <Input value={ingredName} type='text' placeholder='Name of Ingredient' name='name' required onChange={(e) => { setNewItem({ ...newItem, name: e.target.value }); setName(e.target.value) }}></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel sx={{ color: "rgb(207, 0, 207)" }}>Description: </FormLabel>
                    <Input value={ingredDesc} type='text' placeholder='Description' name='description' onChange={(e) => { setNewItem({ ...newItem, description: e.target.value }); setDesc(e.target.value) }}></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel sx={{ color: "yellow" }}>Quantity: </FormLabel>
                    <Input value={ingredQuantity} type='number' placeholder='Quantity' name='quantity' required onChange={(e) => { setNewItem({ ...newItem, quantity: e.target.value }); setQuantity(e.target.value) }}></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel sx={{ color: "rgb(0, 255, 0)" }}>Price: </FormLabel>
                    <Input value={ingredPrice} type='double' placeholder='Price' name='price' required onChange={(e) => { setNewItem({ ...newItem, price: e.target.value }); setPrice(e.target.value) }}></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel sx={{ color: "red" }}>Image URL: </FormLabel>
                    <Input value={ingredImg} type='text' placeholder='Image URL' name='image' required onChange={(e) => { setNewItem({ ...newItem, img: e.target.value }); setImg(e.target.value) }}></Input>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Button type='submit' onClick={handleSubmit}>Submit</Button>
                </Box>
            </FormControl>
        </Container>
    )
}