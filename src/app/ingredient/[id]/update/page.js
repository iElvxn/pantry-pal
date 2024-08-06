import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import UpdateForm from "@/app/components/UpdateForm";
import { redirect } from 'next/navigation'

export default async function UpdateIngredient({ params }) {
    const getData = async (uid) => {
        "use server"
        const userRef = doc(db, "users", uid);
        const docRef = doc(userRef, "ingredients", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // Document data
            const data = docSnap.data();
            return data;
        } else {
            console.log('No such document!');
            return null;
        }
    }

    const updateIngredient = async (uid, updatedIngredient) => {
        "use server"
        const userRef = (doc(db, 'users', uid))
        const docRef = doc(userRef, "ingredients", params.id)
        await setDoc(docRef, {
            name: updatedIngredient.name,
            description: updatedIngredient.description,
            quantity: updatedIngredient.quantity,
            price: updatedIngredient.price,
            img: updatedIngredient.img,
        });
        redirect(`/ingredient/${params.id}`)
    }

        return (
            <UpdateForm getData={getData} updateIngredient={ updateIngredient} />
        );
    }
