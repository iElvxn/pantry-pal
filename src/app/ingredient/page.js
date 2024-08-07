'use client'

import "../../app/page.module.css"
import { useState, useEffect, use, Suspense } from 'react'
import { db, auth } from '../firebase';
import { Box, Container, FormControl, Grid, Typography, Input, Button, FormLabel } from '@mui/material';
import IngredientCard from '../components/IngredientCard';
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
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
  const router = useRouter();
  const [uid, setUid] = useState();
  const [inventory, setInventory] = useState([])
  const [newItem, setNewItem] = useState({
    name: null,
    description: null,
    quantity: 0,
    price: 0,
    img: "",
  });

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (uid) {
      console.log("UID: " + uid);
      updateIngredients(uid);
    }
  }, [uid]);

  const fetchUser = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
        console.log("UID: " + uid)
        updateIngredients(user.uid);
      } else {
        console.log("not logged in")
      }
    });
  }

  const updateIngredients = async () => {
    if (uid) {
      const userRef = (doc(db, 'users', uid))
      const ingredientRef = collection(userRef, "ingredients")
      const ingredientSnap = await getDocs(ingredientRef)

      const inventoryList = []
      ingredientSnap.forEach((doc) => {
        inventoryList.push({ id: doc.id, ...doc.data() })
      })
      setInventory(inventoryList)
    }
  }

  const addIngredient = async (e) => {
    e.preventDefault();
    const userRef = (doc(db, 'users', uid))
    if (newItem.name && newItem.quantity && newItem.price) {
      await addDoc(collection(userRef, 'ingredients'), newItem);
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
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <SearchBar uid={uid} />
      <Typography variant="h4" sx={{ color: 'cyan' }}>Your Pantry</Typography>
      <Box className='ingredient-list' sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '32px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px'}}>
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: "200px"}}>
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
            <Button sx={{color: 'yellow'}} onClick={() => router.push('/camera')}>Use Camera</Button>
          </FormControl>
        </Box>
        <Suspense>
          <Grid container spacing={2} sx={{display: 'flex', justifyContent: { xs: 'center', md: 'normal'}} }>
            {inventory.map((ingredient) => (
              <Grid item key={ingredient.id} xs={8} sm={6} md={4} sx={{ textTransform: 'none', display: 'flex', justifyContent: 'center' }}>
                <IngredientCard ingredient={ingredient} />
              </Grid>
            ))}
          </Grid>
        </Suspense>
      </Box>
    </Container>
  );
}