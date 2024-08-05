'use client'

import "../../app/page.module.css"
import { useState, useEffect, use, Suspense } from 'react'
import { db } from '../firebase';
import { Box, Container, FormControl, Grid, Typography, Input, Button, FormLabel } from '@mui/material';
import IngredientCard from '../components/IngredientCard';
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
import SearchBar from "../components/SearchBar";

export default function IngredientList() {
  const [inventory, setInventory] = useState([])
  const [newItem, setNewItem] = useState({
    name: null,
    description: null,
    quantity: 0,
    price: 0,
    img: "https://pusheen.com/wp-content/uploads/2020/12/What-Sweet-Quiz-SocialResults_Donut-1-e1608220861325.jpg",
  });

  useEffect(() => {
    updateIngredients();
  }, [])

  const updateIngredients = async () => {
    const snapshot = query(collection(db, 'ingredients'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ id: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  const addIngredient = async (e) => {
    e.preventDefault();
    if (newItem.name && newItem.quantity && newItem.price) {
      await addDoc(collection(db, 'ingredients'), newItem);
    }

    setNewItem({
      name: null,
      description: null,
      quantity: 0,
      price: 0,
      img: "",
    })

    updateIngredients();
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SearchBar />
      <Typography variant="h4" sx={{ color: 'cyan' }}>Your Pantry</Typography>
      <Box className='ingredient-list' sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '32px' }}>
        <Box>
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel sx={{ color: "cyan" }}>Name: </FormLabel>
              <Input type='text' placeholder='Name of Ingredient' name='name' required onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}></Input>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel sx={{ color: "rgb(207, 0, 207)" }}>Description: </FormLabel>
              <Input type='text' placeholder='Description' name='description' onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}></Input>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel sx={{ color: "yellow" }}>Quantity: </FormLabel>
              <Input type='number' placeholder='Quantity' name='quantity' required onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}></Input>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel sx={{ color: "rgb(0, 255, 0)" }}>Price: </FormLabel>
              <Input type='double' placeholder='Price' name='price' required onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}></Input>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel sx={{ color: "red" }}>Image URL: </FormLabel>
              <Input type='text' placeholder='Image URL' name='image' required onChange={(e) => setNewItem({ ...newItem, img: e.target.value })}></Input>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button type='submit' onClick={addIngredient}>Submit</Button>
            </Box>
          </FormControl>
        </Box>
        <Suspense>
          <Grid container spacing={2}>
            {inventory.map((ingredient) => (
              <Grid item key={ingredient.id} xs={12} sm={6} md={4} sx={{ textTransform: 'none', display: 'flex', justifyContent: 'center' }}>
                <IngredientCard ingredient={ingredient} />
              </Grid>
            ))}
          </Grid>
        </Suspense>
      </Box>
    </Container>
  );
}