import { adaptV4Theme, Box, Container, Typography } from "@mui/material";
import "../../page.module.css"
import DetailHeader from "@/app/components/DetailHeader";
import { doc, getDoc, deleteDoc, collection } from "firebase/firestore";
import { db, getUser, auth } from "@/app/firebase";
import { redirect } from 'next/navigation'
import IngredientDetail from "@/app/components/IngredientDetail";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default async function IngredientDetailPage({ params }) {
    const id = params.id

    const getData = async (uid) => {
        "use server"
        console.log(uid + " " + id)
        if (uid && uid !== id) {
            const userRef = (doc(db, 'users', uid))
            const docRef = doc(userRef, "ingredients", id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                // Document data
                const data = docSnap.data();
                console.log(data)
                return data;
            } else {
                console.log('No such document!');
                return null;
            }
        }
    }

    const deleteIngredient = async (uid) => {
        "use server"
        const userRef = (doc(db, 'users', uid))
        const docRef = doc(userRef, "ingredients", id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            await deleteDoc(docRef)
        }

        redirect(`/ingredient`)
    }

    return (
        <IngredientDetail getData={getData} id={id} deleteIngredient={deleteIngredient} />
    );
}