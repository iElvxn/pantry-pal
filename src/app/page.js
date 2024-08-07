'use client'

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getCountFromServer } from "firebase/firestore";
import {
  collection,
  doc,
} from 'firebase/firestore'
import { db } from "./firebase";
import { Container, Typography, Box } from "@mui/material";

export default function Home() {
  const [uid, setUid] = useState();
  const [count, setCount] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
        getCount();
      } else {
        console.log("not logged in")
      }
    });
  }, [])

  useEffect(() => {
    if (uid) {
      console.log("UID: " + uid);
      getCount();
    }
  }, [uid]);

  const getCount = async () => {
    if (uid) {
      const userRef = (doc(db, 'users', uid))
      const ingredientRef = collection(userRef, "ingredients")
      const ingredientSnap = await getCountFromServer(ingredientRef)
      const docCount = ingredientSnap.data().count
      setCount(docCount)
    }
  }
  return (
    <Container>
      <Box sx={{ width: "100%", display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{color: 'cyan'}}>Status</Typography>
        <Typography variant="h5" sx={{color: '#39FF14', display: 'flex', flexDirection: 'row', gap: '8px'}}>Count: <Typography variant="h5" sx={{color: 'white'}}> {count}</Typography></Typography>
      </Box>
    </Container>
  );
}
