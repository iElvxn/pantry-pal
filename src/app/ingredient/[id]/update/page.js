import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import UpdateForm from "@/app/components/UpdateForm";
import { redirect } from 'next/navigation'

export default async function UpdateIngredient({ params }) {
    const getData = async (id) => {
        "use server"
        const docRef = doc(db, "ingredients", id);
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

    const updateIngredient = async (updatedIngredient) => {
        "use server"
        await setDoc(doc(db, "ingredients", params.id), {
            name: updatedIngredient.name,
            description: updatedIngredient.description,
            quantity: updatedIngredient.quantity,
            price: updatedIngredient.price,
            img: updatedIngredient.img,
        });
        redirect(`/ingredient/${params.id}`)
    }

        const data = await getData(params.id);

        return (
            <UpdateForm data={data} updateIngredient={updateIngredient} />
        );
    }
