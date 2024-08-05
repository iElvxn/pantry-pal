'use client'
import { useState } from "react";
import { FormControl, Box, Container, Typography, Input, Button, FormLabel, colors } from "@mui/material";

export default function UpdateForm({ data, updateIngredient }) {
    const [newIngredient, setNewIngredient] = useState(data);
    const [ingredName, setName] = useState(data.name);
    const [ingredDesc, setDesc] = useState(data.description);
    const [ingredQuantity, setQuantity] = useState(data.quantity);
    const [ingredPrice, setPrice] = useState(data.price);
    const [ingredImg, setImg] = useState(data.img);

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
                    <Button type='submit' onClick={() => { updateIngredient(newIngredient) }}>Submit</Button>
                </Box>
            </FormControl>
        </Container>
    )
}