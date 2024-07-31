'use client'

import { useState, useEffect } from 'react'
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
import { db } from '../firebase';
import { Box, Container, FormControl, Grid } from '@mui/material';

export default function IngredientList() {
  const [inventory, setInventory] = useState([])
  const [newItem, setNewItem] = useState({
    name: null,
    description: null,
    quantity: 0,
    price: 0,
  });

  const addIngredient = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'ingredients'), newItem);

    setNewItem({
      name: null,
      description: null,
      quantity: 0,
      price: 0,
    })
  }

  return (
    <Container sx={{ display: 'flex' }}>
      <Grid>
        {inventory.map((ingredient) => {
          <div></div>
        })}
      </Grid>

      <Box>
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <label>Name: </label>
            <input type='text' placeholder='Name of Ingredient' name='name' required onChange={(e) => setNewItem({...newItem, name: e.target.value})}></input>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <label>Description: </label>
            <input type='text' placeholder='Description' name='description' required onChange={(e) => setNewItem({...newItem, description: e.target.value})}></input>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <label>Quantity: </label>
            <input type='number' placeholder='Quantity' name='quantity' required onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}></input>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <label>Price: </label>
            <input type='double' placeholder='Price' name='price' required onChange={(e) => setNewItem({...newItem, price: e.target.value})}></input>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <button type='submit' onClick={addIngredient}>Submit</button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
}